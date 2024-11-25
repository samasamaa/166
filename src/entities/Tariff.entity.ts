import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntity } from './Common.entity';
import { TariffRange } from './TariffRange.entity';

@Entity()
export class Tariff extends CommonEntity {
    @Column()
    country: string;

    @OneToMany(() => TariffRange, (range) => range.tariff, { cascade: true })
    ranges: TariffRange[];
}
