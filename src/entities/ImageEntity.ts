import {
    Column,
    Entity,
    ManyToOne,
  } from 'typeorm';
import { CommonEntity } from './Common.entity';
import { News } from './news.entity';
  
@Entity() 
export class ImageEntity extends CommonEntity{

    @Column()
    filename: string;  
  
    @Column()
    url: string;

    @ManyToOne(() => News, (news) => news.images, { onDelete: 'CASCADE' })
    news: News;
}
  