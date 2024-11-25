import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tariff } from '../entities/tariff.entity';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { CreateTariffRangeDto } from './dto/create-tariff-range.dto';
import { TariffRange } from 'src/entities/TariffRange.entity';

@Injectable()
export class TariffService {
    constructor(
        @InjectRepository(Tariff)
        private readonly tariffRepository: Repository<Tariff>,
        @InjectRepository(TariffRange)
        private readonly tariffRangeRepository: Repository<TariffRange>,
    ) {}

    async createTariff(createTariffDto: CreateTariffDto): Promise<Tariff> {
        const { country, rangeIds } = createTariffDto;

        let ranges: TariffRange[] = [];
        if (rangeIds) {
            ranges = await this.tariffRangeRepository.findByIds(rangeIds);
            if (ranges.length !== rangeIds.length) {
                throw new NotFoundException('One or more TariffRange IDs are invalid');
            }
        }

        const tariff = this.tariffRepository.create({
            country,
            ranges,
        });

        return this.tariffRepository.save(tariff);
    }

    async getAll(): Promise<Tariff[]> {
        return this.tariffRepository.find({
            relations: ['ranges'], 
        });
    }
    
    async createTariffRange(createTariffRangeDto: CreateTariffRangeDto): Promise<TariffRange> {
        const range = this.tariffRangeRepository.create(createTariffRangeDto);
        return this.tariffRangeRepository.save(range);
    }
}
