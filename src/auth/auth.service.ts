import { Injectable, UnauthorizedException } from '@nestjs/common';
import SigninDto from './dto/auth.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly database: DatabaseService) {}
  async signin(signinDto: SigninDto) {
    const user = await this.database.user.findUnique({
      where: {
        username: signinDto.username,
      },
    });
    if (user.password !== signinDto.password) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return user;
  }
}
