import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.model';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthDto } from '../users/dto/google-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    await this.userService.updateLastLogin(user.id);
    return this.generateToken(user);
  }

  async register(userDto: CreateUserDto, locale?: string) {
    const candidateEmail = await this.userService.getUserByEmail(userDto.email);

    if (candidateEmail) {
      throw new ConflictException(
        this.i18n.t('validation.registration.EMAIL_EXISTS', { lang: locale }),
      );
    }

    const user = await this.userService.createUser(userDto, locale);

    return this.generateToken(user);
  }

  async googleAuth(dto: GoogleAuthDto) {
    let user = await this.userService.getUserByGoogleId(dto.googleId);

    if (!user) {
      user = await this.userService.getUserByEmail(dto.email);
    }

    if (!user) {
      user = await this.userService.createGoogleUser(dto);
    }

    await this.userService.updateLastLogin(user.id);

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, userId: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  private async validateUser(userDto: LoginDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (passwordEquals) {
        return user;
      }
    }
    throw new UnauthorizedException(
      this.i18n.t('validation.login.INVALID_CREDENTIALS'),
    );
  }
}
