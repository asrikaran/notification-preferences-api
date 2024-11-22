import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from '../schemas/user-preference.schema';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto'; 

@Injectable()
export class PreferencesService {
  constructor(
    @InjectModel('UserPreference') private userPreferenceModel: Model<UserPreference>,
  ) {}

  // Create a new preference
  async create(createPreferenceDto: CreatePreferenceDto): Promise<UserPreference> {
    const createdPreference = new this.userPreferenceModel(createPreferenceDto);
    return createdPreference.save();
  }

  // Find preference by userId (throw error if not found)
  async findOne(userId: string): Promise<UserPreference> {
    const userPreference = await this.userPreferenceModel.findOne({ userId });

    // If no document is found, throw an error
    if (!userPreference) {
      throw new Error(`User preference with userId ${userId} not found`);
    }

    return userPreference;
  }

  // Update preference by userId (throw error if no document found)
  async update(userId: string, updatePreferenceDto: UpdatePreferenceDto): Promise<UserPreference> {
    const updatedPreference = await this.userPreferenceModel.findOneAndUpdate(
      { userId },
      updatePreferenceDto,
      { new: true },
    );

    // If no document is found, throw an error
    if (!updatedPreference) {
      throw new Error(`User preference with userId ${userId} not found`);
    }

    return updatedPreference;
  }

  // Remove preference by userId
  async remove(userId: string): Promise<any> {
    return this.userPreferenceModel.deleteOne({ userId });
  }
}
