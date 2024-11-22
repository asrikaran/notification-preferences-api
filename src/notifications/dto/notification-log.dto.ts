import { IsNotEmpty, IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

// Enum to represent the possible notification types
enum NotificationType {
  MARKETING = 'marketing',
  NEWSLETTER = 'newsletter',
  UPDATES = 'updates',
}

// Enum to represent the possible channels
enum NotificationChannel {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

// Enum to represent the status of the notification
enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  FAILED = 'failed',
}
export class NotificationLogDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsNotEmpty()
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsNotEmpty()
  @IsEnum(NotificationStatus)
  status: NotificationStatus;

  @IsOptional()
  @IsString()
  failureReason?: string;

  @IsOptional()
  @IsDateString()
  sentAt?: Date;

  constructor(userId: string, type: NotificationType, channel: NotificationChannel, status: NotificationStatus) {
    this.userId = userId;
    this.type = type;
    this.channel = channel;
    this.status = status;
  }
}
