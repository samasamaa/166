import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new news item' })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all news items' })
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific news item by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific news item by ID' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific news item by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }
}
