import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as fs from 'fs';
import { join } from 'path';
import { ImageEntity } from 'src/entities/ImageEntity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepo: Repository<ImageEntity>,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<ImageEntity> {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }

    const imageUrl = `/uploads/${file.filename}`;
    const image = this.imageRepo.create({
      filename: file.filename,
      url: imageUrl,
    });

    return await this.imageRepo.save(image);
  }

  async deleteImage(id: number): Promise<void> {
    const image = await this.imageRepo.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException('Image not found');
    }

    const filePath = join(__dirname, '..', '..', 'uploads', image.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.imageRepo.remove(image);
  }

  async listImages(): Promise<ImageEntity[]> {
    return await this.imageRepo.find();
  }
}
