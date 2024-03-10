import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

// services
import { UserService } from '../api/user/user.service';

// entities
import { User } from '../api/user/entities/user.entity';

interface RequestWithUser extends Request {
  currentUser?: User;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const { sub } = await this.jwtService.verifyAsync(token, {
        secret: process.env.NEST_JWT_ACCESS_SECRET,
      });

      const user = await this.userService.findOne({ id: sub });
      req.currentUser = user;

      next();
    } catch {
      next();
    }
  }
}
