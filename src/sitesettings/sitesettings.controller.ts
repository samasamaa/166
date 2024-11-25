import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { SitesettingsService } from './sitesettings.service';
import { CreateSitesettingDto } from './dto/create-sitesetting.dto';
import { UpdateSitesettingDto } from './dto/update-sitesetting.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/enum/user-role.enum';

@Controller('sitesettings')
export class SitesettingsController {
  constructor(private readonly sitesettingsService: SitesettingsService) {}

  @Get()
  async getSettings() {
    return this.sitesettingsService.getSettings();
  }

  @Put()
  @UseGuards(AuthGuard) 
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN) 
  async updateSettings(@Body() updateDto: UpdateSitesettingDto) {
    return this.sitesettingsService.updateSettings(updateDto);
  }

  @Post()
  @UseGuards(AuthGuard) 
  @Roles(UserRole.ADMIN) 
  @ApiBearerAuth()
  async createSettings(@Body() createDto: CreateSitesettingDto) {
    return this.sitesettingsService.createSettings(createDto);
  }
}