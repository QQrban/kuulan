import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './games.model';
import { CreateGameDto } from './dto/create-game.dto';
import { Op } from 'sequelize';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game) private readonly gameRepo: typeof Game) {}

  async create(dto: CreateGameDto) {
    if (dto.minAge > dto.maxAge) {
      throw new BadRequestException('minAge must be <= maxAge');
    }

    return this.gameRepo.create({
      name: dto.name.trim().toLowerCase(),
      description: dto.description,
      categoryId: dto.categoryId,
      minAge: dto.minAge,
      maxAge: dto.maxAge,
      titleKey: dto.titleKey,
      descriptionKey: dto.descriptionKey,
      accessLevel: dto.accessLevel,
      iconKey: dto.iconKey,
    });
  }

  findByAge(age: number, categoryId?: string) {
    return this.gameRepo.findAll({
      where: {
        ...(categoryId ? { categoryId } : {}),
        minAge: { [Op.lte]: age },
        maxAge: { [Op.gte]: age },
      },
      order: [['name', 'ASC']],
    });
  }
}
