import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CargoService } from './cargo.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoStatusDto } from './dto/update-cargo.dto';

@Controller('cargo')
@ApiTags('Cargo')
export class CargoController {
    constructor(private cargoService: CargoService) {}

    @Get()
    findAll() {
        return this.cargoService.findAll();
    }

    @Post()
    create(@Body() createCargoDto: CreateCargoDto) {
        return this.cargoService.create(createCargoDto);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: number, @Body() updateCargoStatusDto: UpdateCargoStatusDto) {
        return this.cargoService.updateStatus(id, updateCargoStatusDto);
    }
}
