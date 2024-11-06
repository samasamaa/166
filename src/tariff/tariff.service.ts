import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tariff } from './tariff.entity';

@Injectable()
export class TariffService {
    constructor(
        @InjectRepository(Tariff)
        private tariffRepository: Repository<Tariff>,
    ) {}

    findTariffsByCountry(country: string): Promise<Tariff[]> {
        return this.tariffRepository.find({ where: { country } });
    }

    findTariffByWeight(country: string, weight: number): Promise<Tariff> {
        return this.tariffRepository.findOne({
            where: { 
                country,
                weightMin: { lte: weight },
                weightMax: { gte: weight }
            },
        });
    }
}
