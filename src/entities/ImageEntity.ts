import {
    Column,
    Entity,
  } from 'typeorm';
import { CommonEntity } from './Common.entity';
  
Entity() 
export class ImageEntity extends CommonEntity{

    @Column()
    filename: string; 
  
    @Column()
    url: string;
}
  