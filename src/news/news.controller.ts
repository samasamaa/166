import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/enum/user-role.enum';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(AuthGuard) 
  @Roles(UserRole.ADMIN) 
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific news item by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(UserRole.ADMIN)  
  @ApiOperation({ summary: 'Update a specific news item by ID' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard) 
  @Roles(UserRole.ADMIN) 
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a specific news item by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.remove(id);
  }
}
