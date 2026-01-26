import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email address' })
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('validation.registration.INVALID_EMAIL'),
    },
  )
  readonly email: string;

  @ApiProperty({
    example: 'test12345!',
    description: 'Password (min 8 len, min 1 letter, min 1 symbol)',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/, {
    message: i18nValidationMessage('validation.registration.PASSWORD_WEAK'),
  })
  readonly password: string;

  @ApiProperty({
    example: 'user123',
    description: 'Username (min 4 len) (max 20 len)',
  })
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[\p{Script=Latin}\p{Script=Cyrillic}0-9_-]+$/u, {
    message: i18nValidationMessage('validation.registration.USERNAME_INVALID'),
  })
  readonly username?: string;
}
