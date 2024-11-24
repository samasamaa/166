import { UserService } from "src/user/user.service";
import { RegisterUserDto } from "./dto/register-user.dto";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";
import { UserRole } from "src/enum/user-roles.enum";

@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(params: LoginUserDto){
        let user = await this.userService.findOne({email: params.email}, ['id', 'password', 'role'])
        if(!user) throw new HttpException("Email or password is incorrect", HttpStatus.BAD_REQUEST);
    
    let checkPassword = await bcrypt.compare(params.password, user.password)
    if(!checkPassword){
        throw new HttpException("Email or password is incorrect", HttpStatus.BAD_REQUEST)
    } 

    let token = this.jwtService.sign({ userId: user.id, role: user.role });
    return{
        status: true,
        token
    }
    }

    async register(params: RegisterUserDto) {
        const existingUser = await this.userService.findOne({ email: params.email });
        if (existingUser) {
            throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST);
        }

        params.password = await bcrypt.hash(params.password, 10);

        if (!params.role) {
            params.role = UserRole.USER;
        } else if (![UserRole.USER, UserRole.LEGAL_ENTITY, UserRole.ADMIN].includes(params.role)) {
            throw new HttpException("Invalid role", HttpStatus.BAD_REQUEST);
        } 
        
        const user = await this.userService.create(params);
        return {
            status: true,
            message: "User registered successfully",
            user
        };
    }

    validateUser(){}
}