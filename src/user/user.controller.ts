import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { UserRole } from "src/enum/user-roles.enum";

@Controller('users')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    list(@Query('role') role?: UserRole) {
        if (role) {
            return this.userService.findByRole(role);
        }
        return this.userService.find();
    }

    @Get(':id')
    getUser(@Param('id') id: number) {
        return this.userService.findOne({ id });
    }
}
