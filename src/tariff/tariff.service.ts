import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tariff } from '../entities/tariff.entity';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { CalculateTariffDto } from './dto/calculate-tariff.dto';

@Injectable()
export class TariffService {
    constructor(
        @InjectRepository(Tariff)
        private tariffRepository: Repository<Tariff>,
    ) {}

    async findAll() {
        return this.tariffRepository.find();
    }

    async create(createTariffDto: CreateTariffDto) {
        const tariff = this.tariffRepository.create(createTariffDto);
        return this.tariffRepository.save(tariff);
    }

    async update(id: number, updateTariffDto: CreateTariffDto) {
        const tariff = await this.tariffRepository.findOneBy({ id });
        if (!tariff) throw new NotFoundException(`Tariff with ID ${id} not found`);

        return this.tariffRepository.save({ ...tariff, ...updateTariffDto });
    }

    async calculate(calculatetariffdto: CalculateTariffDto) {
        const { country, width, height, length, weight } = calculatetariffdto;

        const tariff = await this.tariffRepository.findOne({ where: {country} });
        if (!tariff) throw new NotFoundException(`Tariff for country ${country} not found`);

        const dimensionalWeight = (width * height * length) / 6000;
        const applicableWeight = Math.max(dimensionalWeight, weight);

        let price = 0;
        if (applicableWeight < tariff.weightMin || applicableWeight > tariff.weightMax) {
            throw new Error(`Weight out of tariff range for country ${country}`);
        } else {
            price = applicableWeight * (tariff.priceManat || tariff.priceLocal);
        }

        return { country, applicableWeight, price };
    }
}
