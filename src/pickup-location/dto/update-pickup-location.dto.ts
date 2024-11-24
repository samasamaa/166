import { IsOptional, IsString } from 'class-validator';

export class UpdatePickupLocationDto {
  @IsOptional()
  @IsString()
  location?: string;
}
