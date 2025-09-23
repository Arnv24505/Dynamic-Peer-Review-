const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/peer-review-hub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx|txt|js|jsx|ts|tsx|py|java|cpp|c|html|css/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only supported file types are allowed'));
    }
  }
});

// Models
const User = require('./models/User');
const Project = require('./models/Project');
const Review = require('./models/Review');

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// 1. User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role: role || 'student'
    });
    
    await user.save();
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 2. User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// 3. Project Submission
app.post('/api/projects', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { title, description, tags, category } = req.body;
    const filePath = req.file ? req.file.path : null;
    
    const project = new Project({
      title,
      description,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      category,
      filePath,
      submitter: req.user.userId,
      status: 'pending'
    });
    
    await project.save();
    
    res.status(201).json({
      message: 'Project submitted successfully',
      project: {
        id: project._id,
        title: project.title,
        status: project.status
      }
    });
  } catch (error) {
    console.error('Project submission error:', error);
    res.status(500).json({ error: 'Failed to submit project' });
  }
});

// 4. Get Projects for Review (Review Assignment Logic)
app.get('/api/projects/for-review', authenticateToken, async (req, res) => {
  try {
    // Get projects that need review, excluding user's own projects
    const projects = await Project.find({
      submitter: { $ne: req.user.userId },
      status: 'pending',
      reviewers: { $nin: [req.user.userId] }
    }).populate('submitter', 'name').limit(10);
    
    res.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// 5. Submit Review (Guided Feedback Forms)
app.post('/api/reviews', authenticateToken, async (req, res) => {
  try {
    const { projectId, scores, feedback, overallRating } = req.body;
    
    // Check if user already reviewed this project
    const existingReview = await Review.findOne({
      project: projectId,
      reviewer: req.user.userId
    });
    
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this project' });
    }
    
    const review = new Review({
      project: projectId,
      reviewer: req.user.userId,
      scores,
      feedback,
      overallRating,
      isAnonymous: true
    });
    
    await review.save();
    
    // Update project with new reviewer
    await Project.findByIdAndUpdate(projectId, {
      $push: { reviewers: req.user.userId }
    });
    
    res.status(201).json({
      message: 'Review submitted successfully',
      review: {
        id: review._id,
        projectId: review.project
      }
    });
  } catch (error) {
    console.error('Review submission error:', error);
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// 6. Dashboard - Get User's Projects and Reviews
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  try {
    // Get user's submitted projects
    const submittedProjects = await Project.find({ submitter: req.user.userId })
      .populate({
        path: 'reviews',
        populate: { path: 'reviewer', select: 'name' }
      })
      .sort({ createdAt: -1 });
    
    // Get projects assigned for review
    const assignedReviews = await Project.find({
      reviewers: { $in: [req.user.userId] }
    }).populate('submitter', 'name');
    
    // Get reviews given by user
    const reviewsGiven = await Review.find({ reviewer: req.user.userId })
      .populate('project', 'title');
    
    res.json({
      submittedProjects,
      assignedReviews,
      reviewsGiven
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get project details
app.get('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('submitter', 'name')
      .populate({
        path: 'reviews',
        populate: { path: 'reviewer', select: 'name' }
      });
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

