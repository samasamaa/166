import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePickupLocationDto } from './dto/create-pickup-location.dto';
import { UpdatePickupLocationDto } from './dto/update-pickup-location.dto';
import { PickupLocationEntity } from 'src/entities/Pickup-Location.entity';

@Injectable()
export class PickupLocationService {
  constructor(
    @InjectRepository(PickupLocationEntity)
    private readonly pickupLocationRepository: Repository<PickupLocationEntity>,
  ) {}

  findAll() {
    return this.pickupLocationRepository.find();
  }

  create(createPickupLocationDto: CreatePickupLocationDto) {
    const location = this.pickupLocationRepository.create(createPickupLocationDto);
    return this.pickupLocationRepository.save(location);
  }

  async update(id: number, updatePickupLocationDto: UpdatePickupLocationDto) {
    const location = await this.pickupLocationRepository.findOne({ where: {id} });
    
    if (!location) {
      throw new Error('Pickup location not found');
    }

    const params = updatePickupLocationDto;
    for (let key in params) {
      if (params[key] !== undefined) {
        location[key] = params[key];  
      }
    }
  

    return await this.pickupLocationRepository.save(location);
  }
}
