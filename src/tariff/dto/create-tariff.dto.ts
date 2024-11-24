import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateTariffDto{
    @Type()
    @ApiProperty()
    @IsString()
    country: string;

    @Type()
    @ApiProperty()
    @IsNumber()
    weightMin:number

    @Type()
    @ApiProperty()
    @IsNumber()
    weightMax:number

    @Type()
    @ApiProperty()
    @IsNumber()
    priceLocal: number
}