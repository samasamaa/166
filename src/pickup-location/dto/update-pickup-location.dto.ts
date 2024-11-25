import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePickupLocationDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  location?: string;
}
