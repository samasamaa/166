import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { User } from './User.entity';
import { CommonEntity } from './Common.entity';

@Entity() 
export class PickupLocationEntity extends CommonEntity{
  
  @Column({ unique: true })
  @Index() 
  location: string;

  @OneToMany(() => User, (user) => user.pickupLocation)
  users: User[];

}
