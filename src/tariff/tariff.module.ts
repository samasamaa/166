import { Module } from '@nestjs/common';
import { TariffController } from './tariff.controller';
import { TariffService } from './tariff.service';
import { Tariff } from 'src/entities/Tariff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TariffRange } from 'src/entities/TariffRange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tariff, TariffRange])],
  controllers: [TariffController],
  providers: [TariffService],
  exports: [TariffService],
})
export class TariffModule {}
