import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCargoDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    tariffId: number;

    @IsNumber()
    width: number;

    @IsNumber()
    height: number;

    @IsNumber()
    length: number;

    @IsNumber()
    weight: number;

    @IsOptional()
    @IsString()
    status?: string;
}
