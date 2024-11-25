import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";


@Controller('users')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    list() {
        return this.userService.find();
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.findOne({ id });
    }
}
