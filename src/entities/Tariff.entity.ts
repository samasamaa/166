import { Entity, Column } from 'typeorm';
import { CommonEntity } from './Common.entity';

@Entity()
export class Tariff extends CommonEntity {
    @Column()
    country: string;

    @Column()
    weightMin: number;

    @Column()
    weightMax: number;

    @Column()
    priceLocal: number; 

    @Column()
    priceManat: number;
}
