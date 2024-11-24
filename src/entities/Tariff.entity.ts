import { Entity, Column } from 'typeorm';
import { CommonEntity } from './Common.entity';

@Entity()
export class Tariff extends CommonEntity {
    @Column()
    country: string;

    @Column({ type: 'decimal'})
    weightMin: number;

    @Column({ type: 'decimal'})
    weightMax: number;

    @Column({ type: 'decimal'})
    priceLocal: number; 
}
