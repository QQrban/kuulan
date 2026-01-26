import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'user123',
    description: 'Username (min 4 len) (max 20 len)',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    example: 'automatically',
  })
  @IsString()
  googleId: string;

  @IsString()
  @IsOptional()
  image?: string;
}
