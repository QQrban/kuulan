import { forwardRef, Module } from '@nestjs/common';
import { GameModesService } from './game_modes.service';
import { GameModesController } from './game_modes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { GameMode } from './game_modes.model';

@Module({
  providers: [GameModesService],
  controllers: [GameModesController],
  imports: [
    SequelizeModule.forFeature([GameMode]),
    forwardRef(() => AuthModule),
  ],
})
export class GameModesModule {}
