import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CargoService } from './cargo.service';
import { Cargo } from 'src/entities/Cargo.entity';
import { Tariff } from 'src/entities/tariff.entity';
import { User } from 'src/entities/User.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cargo, Tariff, User])],
    providers: [CargoService],
    exports: [CargoService],
})
export class CargoModule {}
