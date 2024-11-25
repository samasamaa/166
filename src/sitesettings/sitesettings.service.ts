import { Injectable } from '@nestjs/common';
import { CreateSitesettingDto } from './dto/create-sitesetting.dto';
import { UpdateSitesettingDto } from './dto/update-sitesetting.dto';
import { SiteSettings } from 'src/entities/Site-Settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SitesettingsService {
  constructor(
    @InjectRepository(SiteSettings) private settingsRepository: Repository<SiteSettings>
  ){}

  async createSettings(initialData: CreateSitesettingDto) {
    const settings = this.settingsRepository.create(initialData);
    return this.settingsRepository.save(settings);
  }
  

  async getSettings(): Promise<SiteSettings> {
    return this.settingsRepository.findOne({ where: { id: 1 } });
  }

  async updateSettings(updateDto: UpdateSitesettingDto): Promise<SiteSettings> {
    const settings = await this.settingsRepository.findOne({ where: { id: 1 } });
    
    if (!settings) {
      throw new Error('Settings not found. Please create the settings first.');
    }
  
    settings.logoUrl = updateDto.logoUrl ?? settings.logoUrl;
    settings.siteName = updateDto.siteName ?? settings.siteName;
    settings.contactEmail = updateDto.contactEmail ?? settings.contactEmail;
    settings.contactPhone = updateDto.contactPhone ?? settings.contactPhone;
    settings.aboutUs = updateDto.aboutUs ?? settings.aboutUs;
  
    return this.settingsRepository.save(settings);
  }
  

  remove(id: number) {
    return `This action removes a #${id} sitesetting`;
  }
}