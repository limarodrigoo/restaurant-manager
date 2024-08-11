import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import SigninDto from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Post('signin')
  async signin(@Body() signInDto: SigninDto) {
    return this.authService.signin(signInDto.username, signInDto.password);
  }

  @Public()
  @Post('signup')
  async signup(@Body() signupDto: SigninDto) {
    const { username, password } = signupDto;
    return this.userService.create(username, password);
  }
}
