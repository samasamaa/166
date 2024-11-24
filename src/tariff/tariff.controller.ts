import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TariffService } from "./tariff.service";
import { CreateTariffDto } from "./dto/create-tariff.dto";

@Controller('tariff')
@ApiTags('Tariff')
export class TariffController{
    constructor(
        private tariffService : TariffService
    ){}

    @Get()
    findAll(){
        return this.tariffService.findAll();
    }

    @Post()
    create(@Body() createtariffdto: CreateTariffDto ){
        return this.tariffService.create(createtariffdto);
    }
}
