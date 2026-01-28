import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './games.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Get games (filter by age/category)' })
  @ApiResponse({ status: 200, type: [Game] })
  @Get()
  find(@Query('age') age?: string, @Query('categoryId') categoryId?: string) {
    if (!age) {
      throw new BadRequestException('age is required');
    }

    return this.gamesService.findByAge(Number(age), categoryId);
  }

  @ApiOperation({ summary: 'Create game (admin)' })
  @ApiResponse({ status: 201, type: Game })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }
}
