import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tariff } from './tariff.entity';
import { CommonEntity } from './Common.entity';

@Entity()
export class TariffRange extends CommonEntity {

    @Column('float')
    weightMin: number;

    @Column('float')
    weightMax: number;

    @Column('float')
    priceLocal: number;

    @Column('float')
    priceManat: number;

    @ManyToOne(() => Tariff, (tariff) => tariff.ranges, { onDelete: 'CASCADE' })
    tariff: Tariff;
}
