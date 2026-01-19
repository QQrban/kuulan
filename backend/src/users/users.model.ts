import { Column, DataType, Model, Table } from 'sequelize-typescript';

enum Role {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN',
}

interface UserCreationAttrs {
  email: string;
  password: string;
  username: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.FREE,
  })
  declare role: Role;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isVerified: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare lastLoginAt: Date;
}
