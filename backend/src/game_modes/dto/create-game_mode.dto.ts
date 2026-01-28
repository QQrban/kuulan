import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateGameModeDto {
  @ApiProperty({ example: 'games.animal_sounds.modes.listen.title' })
  @IsString()
  titleKey: string;

  @ApiPropertyOptional({ example: 'games.animal_sounds.modes.listen.desc' })
  @IsOptional()
  @IsString()
  descriptionKey?: string;

  @ApiProperty({ example: 1, description: 'Order inside the game' })
  @IsInt()
  @Min(1)
  order: number;
}

export class UpdateGameModeDto {
  @ApiPropertyOptional({ example: 'games.animal_sounds.modes.listen.title' })
  @IsOptional()
  @IsString()
  titleKey?: string;

  @ApiPropertyOptional({ example: 'games.animal_sounds.modes.listen.desc' })
  @IsOptional()
  @IsString()
  descriptionKey?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;
}
