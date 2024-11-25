import { PartialType } from '@nestjs/swagger';
import { CreateSitesettingDto } from './create-sitesetting.dto';

export class UpdateSitesettingDto extends PartialType(CreateSitesettingDto) {}