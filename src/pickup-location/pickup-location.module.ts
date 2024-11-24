import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupLocationService } from './pickup-location.service';
import { PickupLocationController } from './pickup-location.controller';
import { PickupLocationEntity } from 'src/entities/Pickup-Location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PickupLocationEntity])],
  providers: [PickupLocationService],
  controllers: [PickupLocationController],
  exports: [], 
})
export class PickupLocationModule {}
