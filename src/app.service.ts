//notification-preferences-api/src/app.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to the Notification Preferences API!';
  }
}