import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'test12345!' })
  @IsString()
  readonly password: string;
}
