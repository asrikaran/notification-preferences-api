import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesService } from '../src/preferences/preferences.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserPreference } from '../src/schemas/user-preference.schema';

describe('PreferencesService', () => {
  let service: PreferencesService;
  let model: any;

  const mockUserPreference = {
    userId: 'user123',
    email: 'user@example.com',
    preferences: {
      marketing: true,
      newsletter: false,
      updates: true,
      frequency: 'weekly',
      channels: {
        email: true,
        sms: false,
        push: true,
      },
    },
    timezone: 'America/New_York',
    createdAt: new Date(),
    lastUpdated: new Date(),
  };

  const mockUserPreferenceModel = {
    create: jest.fn().mockResolvedValue(mockUserPreference),
    findOne: jest.fn().mockResolvedValue(mockUserPreference),
    findOneAndUpdate: jest.fn().mockResolvedValue(mockUserPreference),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PreferencesService,
        {
          provide: getModelToken('UserPreference'),
          useValue: mockUserPreferenceModel,
        },
      ],
    }).compile();

    service = module.get<PreferencesService>(PreferencesService);
    model = module.get(getModelToken('UserPreference'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user preference', async () => {
    const result = await service.create(mockUserPreference);
    expect(result).toEqual(mockUserPreference);
    expect(model.create).toHaveBeenCalledWith(mockUserPreference);
  });

  it('should find a user preference', async () => {
    const result = await service.findOne('user123');
    expect(result).toEqual(mockUserPreference);
    expect(model.findOne).toHaveBeenCalledWith({ userId: 'user123' });
  });

  it('should update a user preference', async () => {
    const result = await service.update('user123', { email: 'new@example.com' });
    expect(result).toEqual(mockUserPreference);
    expect(model.findOneAndUpdate).toHaveBeenCalled();
  });

  it('should delete a user preference', async () => {
    await service.remove('user123');
    expect(model.deleteOne).toHaveBeenCalledWith({ userId: 'user123' });
  });
});
