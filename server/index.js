import dotenv from 'dotenv';
import './db.js';
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { usersRoutes } from './src/routes/userRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://orthoplex-task-lac.vercel.app'], // Vite's default port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Preflight results cache for 10 minutes
}));

// Enable pre-flight requests for all routes
// app.options('*', cors());

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes with /api prefix
app.use("/api/users", usersRoutes);

// Handle 404 routes
// app.use('*', (req, res) => {
//   res.status(404).json({
//     status: 404,
//     message: 'Route not found'
//   });
// });

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || []
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}! ✅`);
});
