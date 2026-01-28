import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../categories/categories.model';
import { Role } from '../common/enums/role.enum';

interface GameCreationAttrs {
  name: string;
  description: string;
  categoryId: string;
  minAge: number;
  maxAge: number;
  titleKey: string;
  descriptionKey: string;
  accessLevel?: Role;
  iconKey: string;
}

@Table({ tableName: 'games' })
export class Game extends Model<Game, GameCreationAttrs> {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: 'magic_dots', description: 'Unique game slug' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @ApiProperty({
    example: 'Connect the dots',
    description: 'Game description text',
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare description: string;

  @ApiProperty({
    example: 'a3f1b2c3-d4e5-6789-0123-456789abcdef',
    description: 'Category UUID',
  })
  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID, allowNull: false })
  declare categoryId: string;

  @ApiProperty({ type: () => Category, description: 'Category relation' })
  @BelongsTo(() => Category)
  declare category: Category;

  @ApiProperty({ example: 3, description: 'Minimum age' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare minAge: number;

  @ApiProperty({ example: 5, description: 'Maximum age' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare maxAge: number;

  @ApiProperty({
    example: 'games.magic_dots.title',
    description: 'i18n title key',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare titleKey: string;

  @ApiProperty({
    example: 'games.magic_dots.description',
    description: 'i18n description key',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare descriptionKey: string;

  @ApiProperty({ example: Role.FREE, enum: Role, description: 'Access level' })
  @Column({ type: DataType.ENUM(...Object.values(Role)), allowNull: false })
  declare accessLevel: Role.FREE | Role.PREMIUM;

  @ApiProperty({
    example: 'animal_sounds',
    description:
      'Key for frontend icon mapping (e.g. /game-icons/{iconKey}.svg)',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare iconKey: string;
}
