import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { rmSync } from 'fs';
import { join } from 'path';
import { ImageEntity } from 'src/entities/ImageEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(ImageEntity)
    private imageRepo: Repository<ImageEntity>,
  ) {}

  async uploadImage(req: Request, file: Express.Multer.File) {
    const port = req.socket.localPort;
    const image = this.imageRepo.create({
      filename: file.filename,
      url: `${req.protocol}://${req.hostname}${port ? `:${port}` : ''}/uploads/${file.filename}`,
    });

    await this.imageRepo.save(image);
    return image;
  }

  async deleteImage(id: number) {
    const image = await this.imageRepo.findOne({ where: { id } });
    if (!image) throw new NotFoundException('Image not found');

  
    rmSync(join(__dirname, '../../uploads', image.filename), { force: true });

    // Veritabanından sil
    return this.imageRepo.remove(image);
  }

  async deleteImages(images: ImageEntity[]) {
    return await this.imageRepo.remove(images);
  }
}
