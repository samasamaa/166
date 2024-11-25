import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNumber, IsString, Matches, MaxDate, MaxLength, MinLength } from "class-validator";
import * as dateFns from 'date-fns';
import { LoginUserDto } from "./login-user.dto";

import { PickupLocationEntity } from "src/entities/Pickup-Location.entity";
import { Gender } from "src/shared/enum/gender.enum";
import { Nationality } from "src/shared/enum/nationality.enum";
import { UserRole } from "src/shared/enum/user-role.enum";

export class RegisterUserDto extends LoginUserDto {
    @Type()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @ApiProperty({ default: 'Ali' })
    firstName: string;

    @Type()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @ApiProperty({ default: 'Aliyev' })
    lastName: string;

    @Type()
    @IsEmail()
    @ApiProperty({default: 'alialiyev@example.az'})
    email: string;

    @Type()
    @IsString()
    @MinLength(7)
    @MaxLength(7)
    @ApiProperty({ description: 'Unique 7-character code' })
    fincode: string;

    @Type()
    @IsString()
    @MinLength(9)
    @MaxLength(9)
    @ApiProperty({ description: 'Unique 9-character serial number' })
    serialNumber: string;

    @Type()
    @IsString()
    @ApiProperty({ description: 'Address of the user' })
    adress: string;

    @Type()
    @IsString()
    @ApiProperty({ description: 'Phone number of the user' })
    phonenumber: string;

    @Type()
    @IsDate()
    @MaxDate(() => dateFns.add(new Date(), { years: -10 }), {
        message: 'You are too young',
      })
    @ApiProperty({ description: 'Birth date of the user', type: String, format: 'date' })
    birthdate: Date;

    @Type()
    @IsEnum(Gender)
    @ApiProperty({ enum: Gender, default: Gender.MAN })
    gender: Gender;

    @Type()
    @IsEnum(Nationality)
    @ApiProperty({ enum: Nationality, default: Nationality.AZERBAIJANI })
    nationality: Nationality;

    @Type()
    @IsEnum(UserRole)
    @ApiProperty({ enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Type()
    @IsNumber()
    @ApiProperty()
    pickupLocationId: number;
}
