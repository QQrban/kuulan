import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './games.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [GamesService],
  controllers: [GamesController],
  imports: [SequelizeModule.forFeature([Game]), forwardRef(() => AuthModule)],
  exports: [GamesService],
})
export class GamesModule {}
