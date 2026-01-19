import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private readonly i18n: I18nService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException(
        this.i18n.t('validation.registration.EMAIL_EXISTS'),
      );
    }

    const existingUsername = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (existingUsername) {
      throw new ConflictException(
        this.i18n.t('validation.registration.USERNAME_EXISTS'),
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }
}
