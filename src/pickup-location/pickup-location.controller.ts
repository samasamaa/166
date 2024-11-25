import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { PickupLocationService } from './pickup-location.service';
import { CreatePickupLocationDto } from './dto/create-pickup-location.dto';
import { UpdatePickupLocationDto } from './dto/update-pickup-location.dto';
import { AuthGuard } from 'src/guards/auth.guard';

import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/shared/enum/user-role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('pickup-locations')
export class PickupLocationController {
  constructor(private readonly pickupLocationService: PickupLocationService) {}

  @Get()
  getAll() {
    return this.pickupLocationService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard) 
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN) 
  create(@Body() createPickupLocationDto: CreatePickupLocationDto) {
    return this.pickupLocationService.create(createPickupLocationDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard) 
  @Roles(UserRole.ADMIN) 
  update(
    @Param('id') id: number,
    @Body() updatePickupLocationDto: UpdatePickupLocationDto,
  ) {
    return this.pickupLocationService.update(id, updatePickupLocationDto);
  }
}
