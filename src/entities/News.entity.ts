import { Entity, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from './Common.entity';

@Entity()
export class News extends CommonEntity {
  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string; 
}
