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

  async register(userDto: CreateUserDto) {
    const candidateEmail = await this.userService.getUserByEmail(userDto.email);
    if (candidateEmail) {
      throw new ConflictException(
        this.i18n.t('validation.registration.EMAIL_EXISTS'),
      );
    }

    const candidateUsername = await this.userService.getUserByUsername(
      userDto.username,
    );
    if (candidateUsername) {
      throw new ConflictException(
        this.i18n.t('validation.registration.USERNAME_EXISTS'),
      );
    }

    const user = await this.userService.createUser(userDto);

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, userId: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
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
