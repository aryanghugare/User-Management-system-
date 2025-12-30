# Mini User Management System

A full-stack web application for managing user accounts with role-based access control (RBAC). Built with Node.js, Express, MongoDB, and React.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

## 📋 Project Overview

This User Management System provides a complete solution for managing user accounts with different roles and permissions. The system supports:

- **User Authentication**: Secure signup, login, and logout functionality
- **Role-Based Access Control**: Admin and User roles with different permissions
- **User Lifecycle Management**: Activate/deactivate user accounts
- **Profile Management**: Users can update their profile and change passwords
- **Admin Dashboard**: View and manage all users with pagination

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Testing**: Jest + Supertest

### Frontend
- **Library**: React 18 (with Hooks)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Icons**: React Icons

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── index.js          # Configuration variables
│   │   │   └── database.js       # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js # Authentication logic
│   │   │   └── adminController.js# Admin operations
│   │   ├── middleware/
│   │   │   ├── auth.js           # JWT verification & authorization
│   │   │   ├── validate.js       # Request validation
│   │   │   └── errorHandler.js   # Global error handling
│   │   ├── models/
│   │   │   └── User.js           # User schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js     # Auth endpoints
│   │   │   └── adminRoutes.js    # Admin endpoints
│   │   ├── validators/
│   │   │   └── authValidators.js # Input validation rules
│   │   └── server.js             # App entry point
│   ├── tests/
│   │   ├── user.test.js          # User model tests
│   │   ├── auth.test.js          # Authentication tests
│   │   └── validation.test.js    # Validation tests
│   ├── .env.example
│   ├── package.json
│   └── jest.config.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation component
│   │   │   ├── Modal.js          # Confirmation modal
│   │   │   ├── Pagination.js     # Pagination component
│   │   │   ├── ProtectedRoute.js # Route protection
│   │   │   └── Spinner.js        # Loading spinner
│   │   ├── context/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Signup.js         # Registration page
│   │   │   ├── Profile.js        # User profile page
│   │   │   └── AdminDashboard.js # Admin dashboard
│   │   ├── services/
│   │   │   ├── api.js            # Axios instance
│   │   │   ├── authService.js    # Auth API calls
│   │   │   └── adminService.js   # Admin API calls
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your values:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Run tests**
   ```bash
   npm test
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔐 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `NODE_ENV` | Environment (development/production) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | JWT expiration time (e.g., 7d) |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `REACT_APP_API_URL` | Backend API base URL |

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Test@1234"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "user": {
      "id": "...",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Test@1234"
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": "...",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user",
      "status": "active",
      "lastLogin": "2025-12-29T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Smith",
  "email": "johnsmith@example.com"
}
```

#### Change Password
```http
PUT /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "Test@1234",
  "newPassword": "NewPass@1234",
  "confirmPassword": "NewPass@1234"
}
```

### Admin Endpoints (Admin Only)

#### Get All Users
```http
GET /admin/users?page=1&limit=10&search=john
Authorization: Bearer <admin_token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### Activate User
```http
PUT /admin/users/:id/activate
Authorization: Bearer <admin_token>
```

#### Deactivate User
```http
PUT /admin/users/:id/deactivate
Authorization: Bearer <admin_token>
```

## 🧪 Testing

The backend includes unit tests for:
- Password hashing with bcrypt
- JWT token generation and verification
- Email format validation
- Password strength validation
- Role and status validation

Run tests with:
```bash
cd backend
npm test
```

## 🚀 Deployment

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables in dashboard
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set `REACT_APP_API_URL` environment variable
4. Deploy

### Database (MongoDB Atlas)

1. Create cluster on MongoDB Atlas
2. Add IP whitelist (0.0.0.0/0 for all)
3. Create database user
4. Get connection string and add to backend `.env`

## 📝 Live Deployment Links

- **Frontend**: [Add your Vercel/Netlify URL]
- **Backend API**: [Add your Render/Railway URL]
- **API Documentation**: [Add Postman/Swagger URL if available]

## 🎥 Demo Video

[Add link to your screen recording walkthrough]

## 👤 Author

**[Your Name]**

## 📄 License

This project is licensed under the ISC License.
# User-Management-system-
