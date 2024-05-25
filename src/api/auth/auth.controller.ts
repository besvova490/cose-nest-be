import { Controller, Post, Body, UseGuards } from '@nestjs/common';

// services
import { AuthService } from './auth.service';

// guards
import { AuthGuard } from 'src/guards/auth.guard';

// dtos
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

// helpers
import { USER_ROLES } from '../../constants';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('register-champion')
  createChampion(@Body() createAuthDto: RegisterAuthDto) {
    return this.authService.create(createAuthDto, USER_ROLES.SERVICE_CHAMPION);
  }

  @Post('login')
  login(@Body() createAuthDto: CreateUserDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }
}
