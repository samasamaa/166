import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { UserRoles } from "src/common/enum/user-roles";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let req = context.switchToHttp().getRequest();
    let token = req.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    token = token.split(' ')[1];

    try {
      let payload = await this.jwtService.verifyAsync(token);
      if (!payload) throw new UnauthorizedException('Invalid token');

      let user = await this.userService.findOne({ id: payload.userId });
      if (!user) throw new UnauthorizedException('User not found');

      let roles = this.reflector.get<UserRoles[]>('roles', context.getHandler());
      if (roles && !user.roles.includes(user.roles.includes(UserRoles.ADMIN) || user.roles.includes(UserRoles.LEGAL_ENTITY))) {
        let checkRoles = roles.find((role) => user.roles?.includes(role));
        if (!checkRoles) {
          throw new Error();
        }
      }
      req.user = user;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Authorization failed');
    }

    return true;
  }
}
