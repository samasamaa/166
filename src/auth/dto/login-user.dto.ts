import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsString, Matches } from "class-validator";

export class LoginUserDto {
    @Type()
    @IsEmail()
    @ApiProperty({default: 'alialiyev@example.az'})
    email: string;

    @Type()
    @IsString()
    @ApiProperty({default: 'Passw0rd!'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z++++++++++++++++++++++++++++++++++++++++++-+\d@.#$!%*?&]{8,15}$/)
    password: string;
}