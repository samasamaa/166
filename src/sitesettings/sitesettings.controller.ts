import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SitesettingsService } from './sitesettings.service';
import { CreateSitesettingDto } from './dto/create-sitesetting.dto';
import { UpdateSitesettingDto } from './dto/update-sitesetting.dto';

@Controller('sitesettings')
export class SitesettingsController {
  constructor(private readonly sitesettingsService: SitesettingsService) {}

  @Get()
  async getSettings() {
    return this.sitesettingsService.getSettings();
  }

  @Put()
  async updateSettings(@Body() updateDto: UpdateSitesettingDto) {
    return this.sitesettingsService.updateSettings(updateDto);
  }

  @Post()
  async createSettings(@Body() createDto: CreateSitesettingDto) {
    return this.sitesettingsService.createSettings(createDto);
  }
}