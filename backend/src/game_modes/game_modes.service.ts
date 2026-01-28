import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GameMode } from './game_modes.model';
import {
  CreateGameModeDto,
  UpdateGameModeDto,
} from './dto/create-game_mode.dto';

@Injectable()
export class GameModesService {
  constructor(@InjectModel(GameMode) private readonly repo: typeof GameMode) {}

  create(gameId: string, dto: CreateGameModeDto): Promise<GameMode> {
    return this.repo.create({ ...dto, gameId });
  }

  findAllByGame(gameId: string): Promise<GameMode[]> {
    return this.repo.findAll({
      where: { gameId },
      order: [['order', 'ASC']],
    });
  }

  async findOne(gameId: string, id: string): Promise<GameMode> {
    const mode = await this.repo.findOne({ where: { id, gameId } });
    if (!mode) throw new NotFoundException('Game mode not found');
    return mode;
  }

  async update(
    gameId: string,
    id: string,
    dto: UpdateGameModeDto,
  ): Promise<GameMode> {
    const mode = await this.findOne(gameId, id);
    return mode.update(dto);
  }

  async remove(gameId: string, id: string): Promise<{ deleted: true }> {
    const mode = await this.findOne(gameId, id);
    await mode.destroy();
    return { deleted: true };
  }
}
