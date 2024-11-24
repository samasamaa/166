import { IsString } from 'class-validator';

export class CreatePickupLocationDto {
    @IsString()
    location: string;
}
