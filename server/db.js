import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, {
  dbName: process.env.DATABASE_NAME,
});

// Get the default connection
const connection = mongoose.connection;

// Bind connection to events
connection.on("connected", () => console.info("Connected to MongoDB"));
connection.on("disconnected", () => console.info("Disconnected from MongoDB"));
connection.on("error", (e) => console.error("Error:", e.message));

export default connection;
