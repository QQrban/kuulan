import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsIn, IsInt, IsString, IsUUID } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateGameDto {
  @ApiProperty({ example: 'animal_sounds' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'A game about recognizing animal sounds' })
  @IsString()
  description: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ example: 3 })
  @IsInt()
  @IsIn([2, 3, 4, 5, 6, 7])
  minAge: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  @IsIn([2, 3, 4, 5, 6, 7])
  maxAge: number;

  @ApiProperty({ example: 'games.animal_sounds.title' })
  @IsString()
  titleKey: string;

  @ApiProperty({ example: 'games.animal_sounds.description' })
  @IsString()
  descriptionKey: string;

  @ApiProperty({ example: Role.FREE, enum: Role })
  @IsEnum(Role)
  accessLevel: Role;

  @ApiProperty({ example: 'animal_sounds' })
  @IsString()
  iconKey: string;
}
