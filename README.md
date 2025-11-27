# Guftagu

A real-time anonymous chat application where users can match and chat based on preferences, with features like identity reveals, reporting, and admin management.

## Features

- User authentication with OTP verification for MIET domain emails
- Anonymous chat matching based on year and gender preferences
- Real-time messaging with typing indicators and emoji support
- Profile picture upload and management
- Reporting and blocking users
- Admin panel for user oversight and moderation
- Password reset functionality
- Responsive design with dark/light theme support

## Tech Stack

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Cloudinary for image storage
- SendGrid for email services
- Multer for file uploads

### Frontend
- Next.js with React
- TypeScript
- Tailwind CSS for styling
- Socket.IO client for real-time features
- Axios for API calls

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Ashank007/guftagu.git
   cd guftagu
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Set up environment variables (see Environment Variables section below)

5. Start MongoDB on your system

## Environment Variables

### Backend (.env in backend/ directory)
```
MONGODB_URI=mongodb://localhost:27017/guftagu
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@guftagu.com
```

### Frontend (.env.local in frontend/ directory)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```
   The backend will run on http://localhost:5000

2. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```
   The frontend will run on http://localhost:3000

3. Open http://localhost:3000 in your browser

## API Endpoints

### Authentication
- POST /api/auth/send-otp - Send OTP for registration
- POST /api/auth/register - Register new user
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout
- POST /api/auth/forgot-password - Send password reset email
- POST /api/auth/reset-password - Reset password

### User
- PUT /api/user/profile-picture - Update profile picture

### Admin
- GET /api/admin/users - Get all users (admin only)
- GET /api/admin/user/:id - Get user details (admin only)
- PUT /api/admin/remove-report/:userId/:reportId - Remove user report (admin only)
- PUT /api/admin/unsuspend/:userId - Unsuspend user (admin only)
- PUT /api/admin/clear-blocks/:userId - Clear user blocks (admin only)

## Socket.IO Events

### Client to Server
- join-lobby: Join chat lobby with preferences
- leave-lobby: Leave chat lobby
- send-message: Send message to matched user
- report-user: Report current chat partner
- block-user: Block current chat partner
- reveal-identity: Request identity reveal
- disconnect: Handle user disconnection

### Server to Client
- matched: Notify when matched with another user
- receive-message: Receive message from chat partner
- user-typing: Notify when partner is typing
- user-stopped-typing: Notify when partner stopped typing
- user-reported: Notify when user is reported
- user-blocked: Notify when user is blocked
- identity-revealed: Notify when identity is revealed
- partner-disconnected: Notify when chat partner disconnects

## Project Structure

```
guftagu/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── context/
│   │   └── lib/
│   └── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.