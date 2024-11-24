import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tariff } from '../entities/Tariff.entity'
import { CreateTariffDto } from './dto/create-tariff.dto';

@Injectable()
export class TariffService {
    constructor(
        @InjectRepository(Tariff)
        private tariffRepository: Repository<Tariff>,
    ) {}

    findAll(){
        return this.tariffRepository.find();
    }

    create(createTariffDto: CreateTariffDto){
        const tariff = this.tariffRepository.create(createTariffDto)
        return this.tariffRepository.save(tariff);
    }



    findTariffsByCountry(country: string): Promise<Tariff[]> {
        return this.tariffRepository.find({ where: { country } });
    }

    /*findTariffByWeight(country: string, weight: number): Promise<Tariff> {
        return this.tariffRepository.findOne({
            where: { 
                country,
                weightMin: { lte: weight },
                weightMax: { gte: weight }
            },
        });
    }*/
}
