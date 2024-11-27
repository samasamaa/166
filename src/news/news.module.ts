import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from 'src/entities/News.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/entities/ImageEntity';

@Module({
  imports: [TypeOrmModule.forFeature([News, ImageEntity])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
