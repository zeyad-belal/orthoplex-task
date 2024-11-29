# Full Stack Authentication Project

This project consists of a React frontend and Node.js/Express backend with MongoDB for authentication.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Project Structure

```
.
├── client/          # React frontend
└── server/          # Express backend
```

## Setup Instructions

### 1. MongoDB Setup

1. Install MongoDB on your system if you haven't already:
   - [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB service:
   ```bash
   # On macOS/Linux
   sudo service mongod start
   
   # On Windows
   net start MongoDB
   ```

### 2. Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```env
   PORT=5001
   DB_CONNECTION=mongodb://localhost:27017
   JWT_SECRET=your_jwt_secret_key
   DATABASE_NAME=orthoplex
   ```

4. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

### 3. Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory with the following variables:
   ```env
   VITE_APP_API=http://localhost:5001/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Running Tests


```bash
cd client
npm test
```

## API Endpoints

### Authentication Routes

- `POST /api/users/signup` - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

- `POST /api/users/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "rememberMe": false
  }
  ```

### Protected Routes

- `GET /api/users` - Get all users (requires authentication)
  - Header: `Authorization: <token>`

## Environment Variables

### Server (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port number | 5001 |
| DB_CONNECTION | MongoDB connection string | mongodb://localhost:27017 |
| JWT_SECRET | Secret key for JWT | Required |
| DATABASE_NAME | MongoDB database name | orthoplex |

### Client (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_APP_API | Backend API URL | http://localhost:5001/api |

## Features

- User authentication (signup/login)
- JWT-based authentication
- Protected routes
- Remember me functionality
- Error handling
- Form validation
- Responsive design
- Testing setup

## Tech Stack

### Frontend
- React
- Vite
- TailwindCSS
- Axios
- Jest
- React Testing Library

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Jest

## Development

1. Run both client and server in development mode:
   ```bash
   # Terminal 1 - Server
   cd server && npm run dev

   # Terminal 2 - Client
   cd client && npm run dev
   ```

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001/api

## Production Deployment

1. Build the client:
   ```bash
   cd client
   npm run build
   ```

2. Set environment variables for production in both client and server

3. Start the server in production mode:
   ```bash
   cd server
   npm start
   ```

## Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB service is running
   - Check DB_CONNECTION in server/.env
   - Verify DATABASE_NAME matches your MongoDB database
   - Verify MongoDB installation

2. **API Connection Error**
   - Verify VITE_APP_API in client/.env matches server port
   - Ensure server is running
   - Check for CORS issues

3. **JWT Issues**
   - Verify JWT_SECRET is set in server/.env
   - Check token expiration time
   - Clear browser cookies if needed
