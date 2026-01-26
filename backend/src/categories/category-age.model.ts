import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from './categories.model';

interface CategoryAgeCreationAttrs {
  categoryId: string;
  age: number;
}

@Table({ tableName: 'category_ages', timestamps: false })
export class CategoryAge extends Model<CategoryAge, CategoryAgeCreationAttrs> {
  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID, allowNull: false })
  declare categoryId: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare age: number;
}
