import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePickupLocationDto {
    @IsString()
    @ApiProperty()
    location: string;
}
