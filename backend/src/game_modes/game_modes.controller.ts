import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GameModesService } from './game_modes.service';
import {
  CreateGameModeDto,
  UpdateGameModeDto,
} from './dto/create-game_mode.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('game-modes')
@Controller('games/:gameId/modes')
export class GameModesController {
  constructor(private readonly service: GameModesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Param('gameId') gameId: string, @Body() dto: CreateGameModeDto) {
    return this.service.create(gameId, dto);
  }

  @Get()
  findAll(@Param('gameId') gameId: string) {
    return this.service.findAllByGame(gameId);
  }

  @Get(':id')
  findOne(@Param('gameId') gameId: string, @Param('id') id: string) {
    return this.service.findOne(gameId, id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('gameId') gameId: string,
    @Param('id') id: string,
    @Body() dto: UpdateGameModeDto,
  ) {
    return this.service.update(gameId, id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('gameId') gameId: string, @Param('id') id: string) {
    return this.service.remove(gameId, id);
  }
}
