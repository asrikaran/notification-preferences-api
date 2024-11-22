import { IsString, IsBoolean, IsOptional, IsObject } from 'class-validator';

export class UpdatePreferenceDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsObject()
  @IsOptional()
  preferences?: {
    marketing?: boolean;
    newsletter?: boolean;
    updates?: boolean;
    frequency?: string;
    channels?: {
      email?: boolean;
      sms?: boolean;
      push?: boolean;
    };
  };

  @IsString()
  @IsOptional()
  timezone?: string;
}
