import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tariff } from './tariff.entity';
import { CommonEntity } from './Common.entity';
import { User } from './User.entity';


@Entity()
export class Cargo extends CommonEntity{

    @ManyToOne(() => User, (user) => user.cargos, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Tariff, (tariff) => tariff.id, { eager: true })
    tariff: Tariff;

    @Column('float')
    width: number;

    @Column('float')
    height: number;

    @Column('float')
    length: number;

    @Column('float')
    weight: number;

    @Column('float', { nullable: true })
    price: number;

    @Column({ default: 'pending' })
    status: string; 
}
