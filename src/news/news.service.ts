import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { News } from '../entities/news.entity';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ImageEntity } from 'src/entities/ImageEntity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(ImageEntity) private readonly imageRepo: Repository<ImageEntity>
  ) {}

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const { title, description, imageIds } = createNewsDto;

    // Görselleri bul ve ilişkilendir
    const images = imageIds
      ? await this.imageRepo.findBy({ id: In(imageIds) })
      : [];

    if (imageIds && images.length !== imageIds.length) {
      throw new NotFoundException('One or more images not found');
    }

    const news = this.newsRepository.create({
      title,
      description,
      images,
    });

    return this.newsRepository.save(news);
  }

  async findAll(filter?: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: News[]; total: number }> {
    const search = filter?.search || ''; 
    const page = filter?.page || 1;    
    const limit = filter?.limit || 10; 
    const skip = (page - 1) * limit;
  
    const where: any = {};
  
    if (search) {
      where.title = Like(`%${search}%`);
    }
  
    const [data, total] = await this.newsRepository.findAndCount({
      where,
      relations: ['images'],
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
  
    return { data, total };
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepository.findOne({ where: { id } });
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto): Promise<News> {
    const news = await this.findOne(id);

    Object.assign(news, updateNewsDto); 
    return this.newsRepository.save(news);
  }

  async remove(id: number): Promise<void> {
    const result = await this.newsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
  }
}
