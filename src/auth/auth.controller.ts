import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import SigninDto from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signin(@Body() signInDto: SigninDto) {
    return this.authService.signin(signInDto.username, signInDto.password);
  }
}
