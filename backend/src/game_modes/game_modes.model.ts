import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Game } from '../games/games.model';

interface GameModeCreationAttrs {
  gameId: string;
  titleKey: string;
  descriptionKey?: string | null;
  order: number;
}

@Table({ tableName: 'game_modes' })
export class GameMode extends Model<GameMode, GameModeCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Game)
  @Column({ type: DataType.UUID, allowNull: false })
  declare gameId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare titleKey: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare descriptionKey: string | null;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  declare order: number;
}
