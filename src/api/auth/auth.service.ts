import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';

// dtos
import { RegisterAuthDto } from './dto/register-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

// repositories
import { UserRepository } from '../user/user.repository';

// entities
import { User } from '../user/entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';

// helpers
import { USER_ROLES } from '../../constants';

const scrypt = promisify(_scrypt);

const passwordToHash = async (password: string, defaultSalt?: string) => {
  const salt = defaultSalt || randomBytes(8).toString('hex');
  const buf = (await scrypt(password, salt, 32)) as Buffer;
  const hashedPassword = buf.toString('hex');

  return [`${salt}.${buf.toString('hex')}`, hashedPassword];
};

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  private async getTokens(
    id: number,
    email: string,
    role?: string,
    expiresIn?: string,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: id,
          email,
          role,
        },
        {
          secret: process.env.NEST_JWT_ACCESS_SECRET,
          expiresIn: expiresIn || process.env.NEST_JWT_ACCESS_EXPIRATION_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: id,
          email,
          role,
        },
        {
          secret: process.env.NEST_JWT_REFRESH_SECRET,
          expiresIn: process.env.NEST_JWT_REFRESH_EXPIRATION_TIME,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async create(data: RegisterAuthDto, role?: USER_ROLES) {
    const queryRunner = this.dataSource.createQueryRunner();

    const isUserExists = await queryRunner.manager.findOne(User, {
      where: { email: data.email },
    });

    if (isUserExists) {
      throw new BadRequestException('User already exists');
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [hashedPassword] = await passwordToHash(data.password);

      const user = await queryRunner.manager.save(User, {
        email: data.email,
        password: hashedPassword,
      });

      const profile = queryRunner.manager.create(Profile, {
        ...data,
        role: role || USER_ROLES.SERVICE_REQUESTER,
        user,
      } as unknown);

      await queryRunner.manager.save(Profile, profile);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async login(data: CreateUserDto) {
    const { email, password } = data;
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['profile'],
    });

    if (!user) {
      throw new BadRequestException(
        'no active accounts where found with given credentials',
      );
    }

    const [salt, storedPassword] = user.password.split('.');
    const [_, hashedPassword] = await passwordToHash(password, salt);

    if (storedPassword !== hashedPassword) {
      throw new BadRequestException(
        'no active accounts where found with given credentials',
      );
    }

    return this.getTokens(user.id, user.email, user.profile.role);
  }

  async refresh(refreshToken: string) {
    try {
      const data = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.NEST_JWT_REFRESH_SECRET,
      });

      const tokens = await this.getTokens(data.id, data.email);

      return {
        accessToken: tokens.accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
