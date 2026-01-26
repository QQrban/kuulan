import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthDto } from '../users/dto/google-auth.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('google')
  google(@Body() dto: GoogleAuthDto, @Body('locale') locale?: string) {
    return this.authService.googleAuth(dto, locale);
  }

  @Post('/login')
  login(@Body() userDto: LoginDto) {
    return this.authService.login(userDto);
  }

  @Post('/register')
  register(
    @Body() userDto: CreateUserDto,
    @Headers('accept-language') locale: string,
  ) {
    return this.authService.register(userDto, locale);
  }
}
