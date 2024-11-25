import { Module } from '@nestjs/common';
import { SitesettingsService } from './sitesettings.service';
import { SitesettingsController } from './sitesettings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSettings } from 'src/entities/Site-Settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteSettings])],
  controllers: [SitesettingsController],
  providers: [SitesettingsService],
})
export class SitesettingsModule {}