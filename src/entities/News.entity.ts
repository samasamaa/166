import { Entity, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonEntity } from './Common.entity';
import { ImageEntity } from './ImageEntity';

@Entity()
export class News extends CommonEntity {
  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => ImageEntity, (image) => image.news, { cascade: true })
  images: ImageEntity[];
}
