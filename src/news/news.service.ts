import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  
 
  create(createNewsDto: CreateNewsDto) {
 
  }

  findAll() {
 
  }

  findOne(id: number) {
    
  }

  update(id: number, updateNewsDto: UpdateNewsDto) {
   
  }

  remove(id: number) {
   
  }
}
