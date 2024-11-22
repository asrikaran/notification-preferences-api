import { Mongoose } from 'mongoose';

export const mongoConfig = async (app: any) => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MongoDB URI is not defined in environment variables.');
  }

  const mongoose = new Mongoose();
  await mongoose.connect(mongoUri);
  console.log('MongoDB connected');
};
