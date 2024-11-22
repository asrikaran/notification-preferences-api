import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from '../schemas/notification-log.schema';
import { SendNotificationDto } from './dto/send-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('NotificationLog') private readonly notificationLogModel: Model<NotificationLog>,
  ) {}

  async sendNotification(sendNotificationDto: SendNotificationDto): Promise<NotificationLog> {
    const notificationLog = new this.notificationLogModel({
      userId: sendNotificationDto.userId,
      type: sendNotificationDto.type,
      channel: sendNotificationDto.channel,
      status: 'pending',
      metadata: sendNotificationDto.content,
    });

    // Simulate notification sending response
    const externalResponse = { success: true }; // Simulate a successful response from an external service

    // Determine the status based on the external response
    notificationLog.status = externalResponse.success ? 'sent' : 'failed';

    // If the response is a failure, set the failure reason to undefined
    notificationLog.failureReason = externalResponse.success ? undefined : 'Error sending notification';

    // Save the notification log
    await notificationLog.save();

    // Return the created notification log
    return notificationLog;
  }

  async getLogs(userId: string): Promise<NotificationLog[]> {
    return this.notificationLogModel.find({ userId });
  }
}
