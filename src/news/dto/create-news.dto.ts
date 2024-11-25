import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ example: 'Breaking News', description: 'The title of the news' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is a description of the news', description: 'The description of the news' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The image URL for the news', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
