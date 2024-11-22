import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from '../src/notifications/notifications.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotificationLog } from '../src/schemas/notification-log.schema';
import { NotificationType, NotificationChannel } from '../src/notifications/dto/send-notification.dto'; // Ensure correct import paths for the enums

describe('NotificationsService', () => {
  let service: NotificationsService;
  let model: any;

  const mockNotificationLog = {
    userId: 'user123',
    type: NotificationType.MARKETING,  // Use enum values
    channel: NotificationChannel.EMAIL, // Use enum values
    status: 'sent',
    content: {
      subject: 'Special Offer',
      body: 'Check out our latest deals!',
    },
  };

  const mockNotificationLogModel = {
    create: jest.fn().mockResolvedValue(mockNotificationLog),
    find: jest.fn().mockResolvedValue([mockNotificationLog]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getModelToken('NotificationLog'),
          useValue: mockNotificationLogModel,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    model = module.get(getModelToken('NotificationLog'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a notification', async () => {
    const result = await service.sendNotification(mockNotificationLog);
    expect(result).toEqual(mockNotificationLog);
    expect(model.create).toHaveBeenCalledWith(mockNotificationLog);
  });

  it('should get notification logs', async () => {
    const result = await service.getLogs('user123');
    expect(result).toEqual([mockNotificationLog]);
    expect(model.find).toHaveBeenCalledWith({ userId: 'user123' });
  });
});
