import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cargo } from 'src/entities/Cargo.entity';
import { Tariff } from 'src/entities/tariff.entity';
import { Repository } from 'typeorm';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoStatusDto } from './dto/update-cargo.dto';
import { User } from 'src/entities/User.entity';

@Injectable()
export class CargoService {
    constructor(
        @InjectRepository(Cargo)
        private cargoRepository: Repository<Cargo>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Tariff)
        private tariffRepository: Repository<Tariff>,
    ) {}

    async create(createCargoDto: CreateCargoDto) {
      const { userId, tariffId, width, height, length, weight } = createCargoDto;

      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

      const tariff = await this.tariffRepository.findOne({
          where: { id: tariffId },
          relations: ['ranges'],
      });
      if (!tariff) throw new NotFoundException(`Tariff with ID ${tariffId} not found`);

      const dimensionalWeight = width > 60 ? (width * height * length) / 6000 : weight;

      const range = tariff.ranges.find(
          (r) => dimensionalWeight >= r.weightMin && dimensionalWeight <= r.weightMax,
      );
      if (!range) throw new NotFoundException('No applicable tariff range found');

      const price = dimensionalWeight * range.priceManat;

      const cargo = this.cargoRepository.create({
          user,
          tariff,
          width,
          height,
          length,
          weight,
          price,
          status: 'pending', 
      });

      return this.cargoRepository.save(cargo);
  }

    async findAll() {
        return this.cargoRepository.find({ relations: ['tariff'] });
    }

    async updateStatus(id: number, updateCargoStatusDto: UpdateCargoStatusDto) {
        const cargo = await this.cargoRepository.findOne({ where: { id } });
        if (!cargo) throw new NotFoundException(`Cargo with ID ${id} not found`);

        cargo.status = updateCargoStatusDto.status;
        return this.cargoRepository.save(cargo);
    }
}
