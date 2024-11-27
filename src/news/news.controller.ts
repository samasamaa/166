import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/enum/user-role.enum';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UseGuards(AuthGuard) 
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN) 
  @ApiOperation({ summary: 'Create a new news item' })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
@ApiQuery({ name: 'search', required: false, description: 'Search term for filtering news' })
@ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', example: 1 })
@ApiQuery({ name: 'limit', required: false, description: 'Number of results per page', example: 10 })
async findAll(
  @Query('search') search?: string,
  @Query('page') page?: number,
  @Query('limit') limit?: number,
) {
  return this.newsService.findAll({ search, page, limit });
}
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a specific news item by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
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
