import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryAge } from './category-age.model';

interface CategoryCreationAttrs {
  name: string;
  titleKey: string;
  descriptionKey: string;
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: 'colors' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @ApiProperty({
    description: 'i18n key for game title',
    example: 'games.colorsBasic.title',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare titleKey: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare descriptionKey: string;

  @HasMany(() => CategoryAge)
  declare ages: CategoryAge[];
}
