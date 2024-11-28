import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Add debug logs to check environment variables
console.log('DB_CONNECTION:', process.env.DB_CONNECTION);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);

export const connection1 = mongoose.connect(process.env.DB_CONNECTION, {
  dbName: process.env.DATABASE_NAME,
});

connection1.on('connected', () => console.info('Connected to MongoDB'));
connection1.on('disconnected', () => console.info('Disconnected from MongoDB'));
connection1.on('error', (e) => console.error('Error:', e.message));
