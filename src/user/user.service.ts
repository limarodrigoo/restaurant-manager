import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly database: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    return this.database.user.create({
      data: {
        username: createUserDto.username,
        password: hash,
      },
    });
  }

  async findAll() {
    return this.database.user.findMany();
  }

  async findOne(id: number) {
    return this.database.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.database.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.database.user.delete({ where: { id } });
  }
}
