import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { CreateTariffRangeDto } from './dto/create-tariff-range.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/enum/user-role.enum';

@Controller('tariffs')
export class TariffController {
    constructor(private readonly tariffService: TariffService) {}

    @Get()
    async getAll() {
        return this.tariffService.getAll();
    } 
    
    @Post()
    @UseGuards(AuthGuard) 
    @Roles(UserRole.ADMIN) 
    @ApiBearerAuth()
    async createTariff(@Body() createTariffDto: CreateTariffDto) {
        return this.tariffService.createTariff(createTariffDto);
    }

    @Post('range')
    @Roles(UserRole.ADMIN) 
    @UseGuards(AuthGuard) 
    @ApiBearerAuth()
    async createTariffRange(@Body() createTariffRangeDto: CreateTariffRangeDto) {
        return this.tariffService.createTariffRange(createTariffRangeDto);
    }
}
