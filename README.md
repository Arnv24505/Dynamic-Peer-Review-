# 🎓 Dynamic Peer Review & Feedback Hub

A comprehensive peer review platform that enables anonymous, structured feedback for educational and professional projects. Built with modern web technologies to facilitate collaborative learning and constructive criticism.

## 🌟 Features

### 🔐 Authentication & User Management
- **Secure Registration & Login** with JWT authentication
- **Role-based Access Control** (Student, Teacher, Professional, Admin)
- **User Profiles** with customizable information
- **Password Security** with bcrypt hashing
- **Session Management** with 7 day token expiration

### 📝 Project Submission
- **Multi-format Support** for various project types:
  - Essays and written content
  - Code projects (JavaScript, Python, Java, C++, etc.)
  - Artwork and creative projects
  - Video content
  - Presentations
  - Research papers
  - Other creative works
- **File Upload System** with 10MB size limit
- **Project Categorization** and tagging system
- **Anonymous Submission** option
- **Project Status Tracking** (Pending, Under Review, Completed, Archived)

### 🔍 Review System
- **Anonymous Peer Reviews** to ensure unbiased feedback
- **Structured Scoring Criteria**:
  - Clarity (1-5 scale)
  - Quality (1-5 scale)
  - Originality (1-5 scale)
  - Technical Implementation (1-5 scale)
  - Presentation (1-5 scale)
- **Comprehensive Feedback Forms**:
  - Strengths identification
  - Areas for improvement
  - Actionable suggestions
  - General comments
- **Overall Rating System** (1-5 stars)
- **Review Assignment Logic** to prevent self-reviewing
- **Review History Tracking**

### 📊 Dashboard & Analytics
- **Personal Dashboard** with project overview
- **Submitted Projects** management
- **Assigned Reviews** tracking
- **Review History** and statistics
- **Project Performance** metrics
- **Real-time Status Updates**

### 🎨 Modern UI/UX
- **Responsive Design** for all device sizes
- **Tailwind CSS** for beautiful, consistent styling
- **Interactive Components** with smooth animations
- **Toast Notifications** for user feedback
- **Loading States** and error handling
- **Accessibility Features** for inclusive design

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - Modern UI framework
- **React Router DOM 6.8.1** - Client-side routing
- **React Hook Form 7.43.5** - Form handling and validation
- **Axios 1.3.4** - HTTP client for API communication
- **React Hot Toast 2.4.0** - Toast notifications
- **Lucide React 0.263.1** - Icon library
- **Tailwind CSS 3.2.7** - Utility-first CSS framework
- **PostCSS 8.4.21** - CSS processing
- **Autoprefixer 10.4.14** - CSS vendor prefixing

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 7.5.0** - MongoDB object modeling
- **JWT (jsonwebtoken 9.0.2)** - Authentication tokens
- **bcryptjs 2.4.3** - Password hashing
- **Multer 1.4.5** - File upload handling
- **CORS 2.8.5** - Cross-origin resource sharing
- **Express Validator 7.0.1** - Input validation
- **dotenv 16.3.1** - Environment variable management

### Development Tools
- **Nodemon 3.0.1** - Development server auto-restart
- **Concurrently 8.2.0** - Running multiple commands simultaneously
- **React Scripts 5.0.1** - Create React App tooling
- **Jest & React Testing Library** - Testing framework

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.20.8 or higher)
- **MongoDB** (v7.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dynamic-peer-review-hub
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   
   # Or use the convenience script
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   # Create .env file in root directory
   cp .env.example .env
   
   # Edit .env with your configuration
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/peer-review-hub
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads
   ```

4. **Start MongoDB**
   ```bash
   # Using Homebrew (macOS)
   brew services start mongodb-community@7.0
   
   # Or start manually
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (runs both client and server)
   npm run dev
   
   # Or run separately
   npm run server  # Backend on port 5001
   npm run client  # Frontend on port 3000
   ```

6. **Access the application**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5001

## 📁 Project Structure

```
dynamic-peer-review-hub/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── pages/         # Page components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── tailwind.config.js # Tailwind configuration
├── server/                # Express backend
|
│   ├── models/           # Mongoose models
│   │   ├── User.js       # User schema
│   │   ├── Project.js    # Project schema
│   │   └── Review.js     # Review schema
│   └── index.js          # Server entry point
├── uploads/              # File upload directory
├── .env                  # Environment variables
├── package.json          # Root dependencies
└── README.md            # This file
```


## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Projects
- `POST /api/projects` - Submit new project
- `GET /api/projects/for-review` - Get projects available for review
- `GET /api/projects/:id` - Get project details

### Reviews
- `POST /api/reviews` - Submit project review
- `GET /api/reviews/:id` - Get review details

### Dashboard
- `GET /api/dashboard` - Get user dashboard data

## 🎯 Key Features Implemented

### ✅ User Management
- Complete user registration and authentication system
- JWT-based secure sessions
- Role-based access control
- User profile management

### ✅ Project Management
- Multi-format project submission
- File upload with validation
- Project categorization and tagging
- Status tracking and management

### ✅ Review System
- Anonymous peer review functionality
- Structured scoring criteria
- Comprehensive feedback forms
- Review assignment logic

### ✅ Dashboard & Analytics
- Personal dashboard with project overview
- Review tracking and history
- Performance metrics
- Real-time updates

### ✅ Security & Validation
- Input validation and sanitization
- File type and size restrictions
- Secure password hashing
- CORS protection

### ✅ UI/UX
- Responsive design for all devices
- Modern, intuitive interface
- Smooth animations and transitions
- Accessibility features

## 🐛 Issues Resolved

### Port Configuration
- **Issue**: Server was conflicting with Apple's AirPlay service on port 5000
- **Solution**: Changed server port to 5001 and updated client proxy configuration

### Missing User Model
- **Issue**: Server couldn't find the User model file
- **Solution**: Created comprehensive User.js model with authentication methods

### Mongoose Populate Errors
- **Issue**: Dashboard endpoint failing due to missing reviews field in Project model
- **Solution**: Added reviews field to Project schema and fixed populate queries

### Environment Configuration
- **Issue**: Server was using cached port configuration
- **Solution**: Updated .env file to use correct port and restarted services

### File Upload System
- **Issue**: Missing uploads directory and file validation
- **Solution**: Created uploads directory and implemented file type/size validation

## 🚀 Deployment

### Production Build
```bash
# Build the client
npm run build

# Start production server
npm start
```

### Environment Variables for Production
```bash
PORT=5001
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db-url
JWT_SECRET=your-production-jwt-secret
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js team for the robust backend framework
- MongoDB team for the flexible database
- Tailwind CSS team for the utility-first CSS framework
- All open-source contributors who made this project possible

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for collaborative learning and peer review excellence**