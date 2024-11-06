import { Entity, Column } from 'typeorm';
import { CommonEntity } from './Common.entity';

@Entity('tariffs')
export class Tariff extends CommonEntity {
    @Column()
    country: string;

    @Column({ type: 'decimal', precision: 5, scale: 3 })
    weightMin: number;

    @Column({ type: 'decimal', precision: 5, scale: 3 })
    weightMax: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 })
    priceLocal: number; 
}
