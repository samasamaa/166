import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateTariffDto {
    @ApiProperty({ example: 'Turkey', description: 'Country associated with the tariff' })
    @IsString()
    country: string;

    @ApiProperty({
        example: [1, 2],
        description: 'IDs of the tariff ranges associated with this tariff',
        required: false,
    })
    @IsOptional()
    @IsArray()
    rangeIds?: number[]; 
}
