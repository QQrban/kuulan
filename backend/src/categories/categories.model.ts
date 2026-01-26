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
  @ApiProperty({ example: 'uuid' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: 'colors' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare titleKey: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare descriptionKey: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @HasMany(() => CategoryAge)
  declare ages: CategoryAge[];
}
