import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CalculateTariffDto {
    @ApiProperty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsNumber()
    width: number;

    @ApiProperty()
    @IsNumber()
    height: number;

    @ApiProperty()
    @IsNumber()
    length: number;

    @ApiProperty()
    @IsNumber()
    weight: number;
}
