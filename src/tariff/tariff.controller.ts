import { Controller, Post, Body, Get } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { CreateTariffRangeDto } from './dto/create-tariff-range.dto';

@Controller('tariffs')
export class TariffController {
    constructor(private readonly tariffService: TariffService) {}

    @Get()
    async getAll() {
        return this.tariffService.getAll();
    } 
    
    @Post()
    async createTariff(@Body() createTariffDto: CreateTariffDto) {
        return this.tariffService.createTariff(createTariffDto);
    }

    @Post('range')
    async createTariffRange(@Body() createTariffRangeDto: CreateTariffRangeDto) {
        return this.tariffService.createTariffRange(createTariffRangeDto);
    }
}
