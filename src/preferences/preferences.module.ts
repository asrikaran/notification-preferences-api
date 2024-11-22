import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesService } from './preferences.service';
import { PreferencesController } from './preferences.controller';
import { UserPreferenceModel } from '../schemas/user-preference.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserPreference', schema: UserPreferenceModel.schema }]),  
  ],
  providers: [PreferencesService],
  controllers: [PreferencesController],
})
export class PreferencesModule {}
