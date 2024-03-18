import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

//helpers
import { extractTokenFromHeader } from 'src/utils/extract-token-from-header';
import { checkIfAuthorized } from 'src/utils/check-if-authorized';
import { USER_ROLES } from 'src/constants';
import { ROLE_KEY } from 'src/decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<USER_ROLES[]>(
      ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    const payload = await checkIfAuthorized({
      token,
      jwtService: this.jwtService,
    });

    if (
      requiredRoles.length &&
      !!payload?.role &&
      !requiredRoles.includes(payload.role)
    ) {
      throw new ForbiddenException(
        'You are not authorized to access this resource.',
      );
    }

    return true;
  }
}
