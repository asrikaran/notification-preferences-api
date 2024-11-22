import { IsNotEmpty, IsEnum, IsObject, IsString } from 'class-validator';

// Exporting the NotificationType enum so it can be accessed in other files
export enum NotificationType {
  MARKETING = 'marketing',
  NEWSLETTER = 'newsletter',
  UPDATES = 'updates',
}

// Exporting the NotificationChannel enum so it can be accessed in other files
export enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export class SendNotificationDto {
  @IsNotEmpty()
  userId: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsObject()
  content: { 
    subject: string;
    body: string;
  };

  constructor(userId: string, type: NotificationType, channel: NotificationChannel, content: { subject: string; body: string }) {
    this.userId = userId;
    this.type = type;
    this.channel = channel;
    this.content = content;
  }
}
