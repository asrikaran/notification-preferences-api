import { IsString, IsNotEmpty, IsBoolean, IsObject, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

// Define the nested preferences object
class PreferenceChannels {
  @IsBoolean()
  email: boolean;

  @IsBoolean()
  sms: boolean;

  @IsBoolean()
  push: boolean;

  constructor(email: boolean, sms: boolean, push: boolean) {
    this.email = email;
    this.sms = sms;
    this.push = push;
  }
}

class Preferences {
  @IsBoolean()
  marketing: boolean;

  @IsBoolean()
  newsletter: boolean;

  @IsBoolean()
  updates: boolean;

  @IsString()
  frequency: string;

  @ValidateNested()
  @Type(() => PreferenceChannels)
  channels: PreferenceChannels;

  constructor(
    marketing: boolean,
    newsletter: boolean,
    updates: boolean,
    frequency: string,
    channels: PreferenceChannels
  ) {
    this.marketing = marketing;
    this.newsletter = newsletter;
    this.updates = updates;
    this.frequency = frequency;
    this.channels = channels;
  }
}

export class CreatePreferenceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  @Type(() => Preferences)
  preferences: Preferences;

  @IsString()
  timezone: string;

  constructor(userId: string, email: string, preferences: Preferences, timezone: string) {
    this.userId = userId;
    this.email = email;
    this.preferences = preferences;
    this.timezone = timezone;
  }
}
