import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserKey } from "src/entities/User.entity";
import { UserRole } from "src/shared/enum/user-role.enum";

import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ){}

    find(where?: FindOptionsWhere<User>){
        return this.userRepo.find({where})
    }

    findOne(where: FindOptionsWhere<User>, select?: UserKey[]){
        return this.userRepo.findOne({where, select})
    }

    async create (params: Partial<User>){
        let checkEmail = await this.findOne({email: params.email})
        if(checkEmail){
            throw new ConflictException('User with this email already exists')
        }

        if (!params.role) {
            params.role = UserRole.USER; 
        }

        let user = this.userRepo.create(params)
        await user.save();
        return user;
    }

    findByRole(role: UserRole) {
        return this.userRepo.find({ where: { role } });
    }
}