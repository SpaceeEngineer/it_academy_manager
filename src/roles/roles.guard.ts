import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRoleService } from 'src/roles/interfaces/IRoleService';
import { ROLE_SERVICE } from 'src/shared/constants/serviceConstants';
import { ROLES_KEY } from './roles.auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(ROLE_SERVICE)
    private roleService: IRoleService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requiredRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      const userRole = await this.roleService.getRoleById(req.user.roleId);

      return requiredRoles.includes(userRole.roleName);
    } catch (e) {
      throw new HttpException('User does not have access', HttpStatus.FORBIDDEN);
    }
  }
}
