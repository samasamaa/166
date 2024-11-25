import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateSitesettingDto {
  @Type()
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  siteName: string;

  @Type()
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  logoUrl: string;

  @Type()
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  aboutUs: string;

  @Type()
  @ApiProperty()
  @IsEmail()
  @Length(3, 30)
  contactEmail: string;

  @Type()
  @ApiProperty()
  @IsString()
  @Length(3, 30)
  contactPhone: string;
}