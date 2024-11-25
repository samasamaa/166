import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from 'src/entities/ImageEntity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
