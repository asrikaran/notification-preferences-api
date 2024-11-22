import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { notificationLogSchema } from '../schemas/notification-log.schema';  
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'NotificationLog', schema: notificationLogSchema }]), 
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
