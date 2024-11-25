import { BeforeInsert, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from './Common.entity';
import * as bcrypt from "bcrypt"
import { PickupLocationEntity } from "./Pickup-Location.entity";
import { Cargo } from "./Cargo.entity";
import { Gender } from "src/shared/enum/gender.enum";
import { UserRole } from "src/shared/enum/user-role.enum";
import { Nationality } from "src/shared/enum/nationality.enum";

export type UserKey = keyof User; 

@Entity()
export class User extends CommonEntity {
    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        type: "enum",
        enum: Gender,
        default: Gender.MAN
    })
    gender: Gender;

    @Column({ unique: true })
    fincode: string;

    @Column({ unique: true })
    serialNumber: string;

    @Column()
    adress: string;

    @Column()
    phonenumber: string;

    @Column({ type: 'date' })
    birthdate: Date;

    @Column({
        type: "enum",
        enum: Nationality,
        default: Nationality.AZERBAIJANI
    })
    nationality: Nationality;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;    

    @ManyToOne(() => PickupLocationEntity, (location) => location.users)
    pickupLocation: PickupLocationEntity;

    @BeforeInsert()
    async beforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @OneToMany(() => Cargo, (cargo) => cargo.user)
    cargos: Cargo[];
}
