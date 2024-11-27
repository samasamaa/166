import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'Breaking News', description: 'The title of the news' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is a description of the news', description: 'The description of the news' })
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ description: 'Array of image IDs', example: [1, 2, 3] })
  imageIds?: number[];
}
