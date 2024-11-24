import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './Common.entity';

@Entity()
export class SiteSettings extends CommonEntity{
  @Column({ nullable: true })
  siteName: string;

  @Column({ nullable: true })
  logoUrl: string; 

  @Column({ type: 'text', nullable: true })
  aboutUs: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  contactPhone: string;
}
