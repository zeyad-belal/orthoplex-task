import dotenv from 'dotenv';
import './db.js';
import 'express-async-error';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';

dotenv.config();

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);

// import routes
const usersRoutes = require("./src/routes/userRoutes");

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
// Routes
app.use("/users", usersRoutes);



// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || []
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}! ✅`);
});
