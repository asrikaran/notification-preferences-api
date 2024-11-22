import { Schema, Document, model } from 'mongoose';

// Define the Notification Log schema
const notificationLogSchema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ['marketing', 'newsletter', 'updates'], required: true },
  channel: { type: String, enum: ['email', 'sms', 'push'], required: true },
  status: { type: String, enum: ['pending', 'sent', 'failed'], required: true },
  failureReason: { type: String, required: false },
  sentAt: { type: Date, required: false },
});

// Define a TypeScript interface for the Notification Log document
export interface NotificationLog extends Document {
  userId: string;
  type: 'marketing' | 'newsletter' | 'updates';
  channel: 'email' | 'sms' | 'push';
  status: 'pending' | 'sent' | 'failed';
  failureReason?: string;
  sentAt?: Date;
}

// Export the schema and interface separately
export { notificationLogSchema };  // Export schema
export const NotificationLogModel = model<NotificationLog>('NotificationLog', notificationLogSchema);  // Export model
