import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateTariffRangeDto {
    @ApiProperty({ example: 0.0, description: 'Minimum weight for the range (kg)' })
    @IsNumber()
    weightMin: number;

    @ApiProperty({ example: 5.0, description: 'Maximum weight for the range (kg)' })
    @IsNumber()
    weightMax: number;

    @ApiProperty({ example: 10.0, description: 'Price in local currency for this range' })
    @IsNumber()
    priceLocal: number;

    @ApiProperty({ example: 15.0, description: 'Price in Manat for this range' })
    @IsNumber()
    priceManat: number;
}
