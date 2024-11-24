import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { CommonEntity } from './Common.entity';

@Entity()
export class Order extends CommonEntity {
  /*@ManyToOne(() => User, (user) => user.orders)
  user: User;*/

  @Column()
  link: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  size: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceInTL: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalCost: number;

  @Column({ nullable: true })
  note: string;

  @Column({ default: 'pending' })
  status: string;
}
