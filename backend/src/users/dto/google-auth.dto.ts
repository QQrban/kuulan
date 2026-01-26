import { IsEmail, IsOptional, IsString } from 'class-validator';

export class GoogleAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  googleId: string;

  @IsString()
  @IsOptional()
  image?: string;
}
