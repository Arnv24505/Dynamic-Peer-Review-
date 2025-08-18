# Dynamic Peer Review & Feedback Hub

A comprehensive web platform where students, professionals, and creatives can anonymously submit their work, receive structured peer reviews, and provide feedback to others.

## 🎯 Project Overview

The Dynamic Peer Review & Feedback Hub removes bias through anonymity and offers structured, rubric-based feedback. This platform promotes collaborative learning and helps users improve their work through constructive peer feedback.

## ✨ MVP Features (6 Core Features)

1. **✅ User Registration/Login** - Email/password authentication with JWT
2. **✅ Project/Work Submission** - Upload documents, images, code with description and tags
3. **✅ Anonymized Peer Review System** - Reviewer identity hidden from submitter
4. **✅ Review Assignment Logic** - Match reviewers randomly or based on tags/skills
5. **✅ Guided Feedback Forms** - Structured feedback with text and score ratings
6. **✅ Dashboard for Pending Reviews** - Show all works assigned to the user for review

## 🚀 Tech Stack

- **Frontend**: React 18 + TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs
- **File Upload**: Multer
- **UI Components**: Lucide React Icons
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
Dynamic Peer Review/
├── server/                 # Backend server
│   ├── models/            # MongoDB models
│   │   ├── User.js       # User model
│   │   ├── Project.js    # Project model
│   │   └── Review.js     # Review model
│   └── index.js          # Express server
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main app component
│   ├── package.json      # Frontend dependencies
│   └── tailwind.config.js # TailwindCSS config
├── package.json           # Backend dependencies
└── README.md             # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/peer-review-hub
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads
   ```

3. **Start MongoDB:**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas cloud service
   ```

4. **Start the backend server:**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

### Full Stack Development

To run both backend and frontend simultaneously:
```bash
# From root directory
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Projects
- `POST /api/projects` - Submit new project
- `GET /api/projects/for-review` - Get projects for review
- `GET /api/projects/:id` - Get project details

### Reviews
- `POST /api/reviews` - Submit review
- `GET /api/dashboard` - Get user dashboard data

## 🔐 Authentication Flow

1. **Registration**: Users create accounts with email, password, name, and role
2. **Login**: JWT token-based authentication
3. **Protected Routes**: All project and review operations require authentication
4. **Anonymous Reviews**: Reviewers remain anonymous to project submitters

## 📊 Review System

### Scoring Criteria (1-5 scale)
- **Clarity**: How clear and understandable is the project?
- **Quality**: How well-executed and polished is the work?
- **Originality**: How creative and innovative is the approach?
- **Technical**: How technically sound and well-implemented is it?
- **Presentation**: How well is the work presented and formatted?

### Feedback Structure
- **Strengths**: What aspects work well
- **Areas for Improvement**: What could be enhanced
- **Suggestions**: Specific improvement recommendations
- **General Feedback**: Additional comments

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Modern Interface**: Clean, intuitive design with smooth animations
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Visual feedback during async operations

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure authentication without server-side sessions
- **Input Validation**: Server-side validation for all inputs
- **File Upload Security**: File type and size restrictions
- **CORS Protection**: Cross-origin request handling

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production`
2. Configure production MongoDB URI
3. Use strong JWT secret
4. Set up proper CORS origins
5. Configure file upload paths

### Frontend Deployment
1. Build the React app: `npm run build`
2. Serve static files from backend
3. Configure API proxy for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support or questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔮 Future Enhancements

### Post-MVP Features
- Google/LinkedIn OAuth integration
- Advanced review assignment algorithms
- Review quality scoring
- Community features and discussions
- Export/import functionality
- Advanced analytics and reporting
- Mobile app development
- Integration with learning management systems

---

**Built with ❤️ for collaborative learning and peer feedback**
