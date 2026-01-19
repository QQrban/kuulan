import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/, {
    message: i18nValidationMessage('validation.registration.PASSWORD_WEAK'),
  })
  readonly password: string;

  @IsString()
  @MinLength(4)
  readonly username: string;
}
