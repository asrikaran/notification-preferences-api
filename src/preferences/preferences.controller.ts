import { Controller, Post, Get, Body, Param, Put, Delete } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';  
import { UserPreference } from '../schemas/user-preference.schema'; 

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  async create(@Body() createPreferenceDto: CreatePreferenceDto): Promise<UserPreference> {
    return this.preferencesService.create(createPreferenceDto);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<UserPreference> {
    return this.preferencesService.findOne(userId);
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ): Promise<UserPreference> {
    return this.preferencesService.update(userId, updatePreferenceDto);
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string): Promise<any> {
    return this.preferencesService.remove(userId);
  }
}
