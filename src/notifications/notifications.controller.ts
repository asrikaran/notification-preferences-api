import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { SendNotificationDto } from './dto/send-notification.dto';
import { NotificationLog } from '../schemas/notification-log.schema';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async sendNotification(
    @Body() sendNotificationDto: SendNotificationDto,
  ): Promise<NotificationLog> {
    return this.notificationsService.sendNotification(sendNotificationDto);
  }

  @Get(':userId')
  async getLogs(@Param('userId') userId: string): Promise<NotificationLog[]> {
    return this.notificationsService.getLogs(userId);
  }
}
