import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

// decorators
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

// helpers
import { checkIfAuthorized } from 'src/utils/check-if-authorized';
import { extractTokenFromHeader } from 'src/utils/extract-token-from-header';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);

    const payload = await checkIfAuthorized({
      pathname: request.route.path,
      token,
      jwtService: this.jwtService,
    });
    request['token'] = payload;

    return true;
  }
}
