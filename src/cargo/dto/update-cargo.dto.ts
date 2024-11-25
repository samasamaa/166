import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateCargoStatusDto {
    @ApiProperty()
    @IsString()
    status: string; 
}