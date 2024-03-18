import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// constants
import { API_ENDPOINTS } from 'src/constants';

interface ICheckIfAuthorized {
  pathname?: string;
  token?: string;
  jwtService: JwtService;
}

export async function checkIfAuthorized({
  pathname,
  token,
  jwtService,
}: ICheckIfAuthorized) {
  if (!token) {
    throw new UnauthorizedException();
  }

  try {
    const payload = await jwtService.verifyAsync(token, {
      secret: process.env.NEST_JWT_ACCESS_SECRET,
      ignoreExpiration:
        !!pathname && pathname.includes(`/${API_ENDPOINTS.AUTH}/refresh`),
    });

    return payload;
  } catch (error) {
    throw new UnauthorizedException();
  }
}
