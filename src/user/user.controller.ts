import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";


@Controller('users')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard) 
    list() {
        return this.userService.find();
    }

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard) 
    getUser(@Param('id') id: number) {
        return this.userService.findOne({ id });
    }
}
