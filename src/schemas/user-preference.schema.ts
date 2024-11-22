import { Schema, Document, model } from 'mongoose';

// Define the schema
export const userPreferenceSchema = new Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  preferences: {
    marketing: { type: Boolean, required: true },
    newsletter: { type: Boolean, required: true },
    updates: { type: Boolean, required: true },
    frequency: { type: String, required: true },
    channels: {
      email: { type: Boolean, required: true },
      sms: { type: Boolean, required: true },
      push: { type: Boolean, required: true },
    },
  },
  timezone: { type: String, required: true },
});

// Define the interface
export interface UserPreference extends Document {
  userId: string;
  email: string;
  preferences: {
    marketing: boolean;
    newsletter: boolean;
    updates: boolean;
    frequency: string;
    channels: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  timezone: string;
}

// Export the model
export const UserPreferenceModel = model<UserPreference>('UserPreference', userPreferenceSchema);
