import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../common/enums/role.enum';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { generateUsername } from './helpers/username-generator';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async createUser(dto: CreateUserDto, locale?: string): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const username = dto.username?.trim()
      ? dto.username.trim()
      : await generateUsername(this.userRepository, locale);

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.userRepository.create({
      email: dto.email,
      username,
      password: hashedPassword,
    });
  }

  async createGoogleUser(dto: GoogleAuthDto, locale?: string): Promise<User> {
    const username = dto.username?.trim()
      ? dto.username.trim()
      : await generateUsername(this.userRepository, locale);

    return this.userRepository.create({
      email: dto.email,
      username,
      password: '',
      googleId: dto.googleId,
    });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async getUserById(id: string) {
    return this.userRepository.findByPk(id);
  }

  async getAllUsers() {
    return this.userRepository.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async updateLastLogin(userId: string) {
    await this.userRepository.update(
      { lastLoginAt: new Date() },
      { where: { id: userId } },
    );
  }

  async updateRole(userId: string, role: Role) {
    await this.userRepository.update({ role }, { where: { id: userId } });
  }

  async getUserByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { googleId } });
  }
}
