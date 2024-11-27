import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCargoDto {
    @IsNumber()
    @ApiProperty()
    userId: number;

    @IsNumber()
    @ApiProperty()
    tariffId: number;

    @IsNumber()
    @ApiProperty()
    width: number;

    @IsNumber()
    @ApiProperty()
    height: number;

    @IsNumber()
    @ApiProperty()
    length: number;

    @IsNumber()
    @ApiProperty()
    weight: number;

    @IsOptional()
    @ApiProperty()
    @IsString()
    status?: string;
}
