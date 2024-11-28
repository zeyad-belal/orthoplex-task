import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connection1 = mongoose.createConnection(process.env.DB_CONNECTION, {
  dbName: process.env.DATABASE_NAME,
});

connection1.on('connected', () => console.info('Connected to MongoDB'));
connection1.on('disconnected', () => console.info('Disconnected from MongoDB'));
connection1.on('error', (e) => console.error('Error:', e.message));
