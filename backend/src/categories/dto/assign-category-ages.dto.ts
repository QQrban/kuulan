import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsIn, IsUUID } from 'class-validator';

export class AssignCategoryAgesDto {
  @ApiProperty({ example: 'uuid' })
  @IsUUID()
  categoryId: string;

  @ApiProperty({ example: [4, 5, 6] })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn([2, 3, 4, 5, 6, 7], { each: true })
  ages: number[];
}
