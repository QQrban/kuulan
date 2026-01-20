import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'test12345!' })
  @IsString()
  @MinLength(8)
  readonly password: string;
}
