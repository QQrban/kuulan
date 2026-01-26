import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsIn,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'colors' })
  @IsString()
  name: string;

  @ApiProperty({ example: [4, 5, 6] })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsIn([2, 3, 4, 5, 6, 7], { each: true })
  ages: number[];
}
