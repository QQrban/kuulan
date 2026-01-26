import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../common/enums/role.enum';

interface UserCreationAttrs {
  email: string;
  password: string;
  username?: string;
  googleId?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'User unique identifier' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  declare googleId: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'User email address' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @ApiProperty({
    example: 'test12345!',
    description: 'Password (min 8 len, min 1 letter, min 1 symbol)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({ example: 'user123', description: 'Username (min 4 len)' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: true,
  })
  declare username: string;

  @ApiProperty({ example: 'PREMIUM', description: "User's role" })
  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.FREE,
  })
  declare role: Role;

  @ApiProperty({ example: 'TRUE', description: 'Is user verified' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare isVerified: boolean;

  @ApiProperty({ example: 'Mon 12:25', description: "User's last login date" })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  declare lastLoginAt: Date;
}
