import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}
  async signin(username: string, password: string) {
    const user = await this.database.user.findUnique({
      where: {
        username: username,
      },
    });
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    delete user.password;
    return {
      accesToken: await this.jwtService.signAsync(user),
    };
  }
}
