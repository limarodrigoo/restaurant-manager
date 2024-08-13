import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ItensService {
  constructor(private readonly database: DatabaseService) {}
  async create(createItem: Prisma.ItemCreateInput) {
    return this.database.item.create({ data: createItem });
  }

  async findAll() {
    return this.database.item.findMany();
  }

  async findOne(id: number) {
    return this.database.item.findUnique({
      where: {
        id,
      },
    });
  }

  async findByArgument(argument: string, restaurantId: number) {
    return this.database.item.findMany({
      where: {
        restaurantId,
        name: {
          contains: argument,
          mode: 'insensitive',
        },
      },
    });
  }

  async update(id: number, updateItem: Prisma.ItemUpdateInput) {
    return this.database.item.update({
      where: {
        id,
      },
      data: updateItem,
    });
  }

  async remove(id: number) {
    return this.database.item.delete({
      where: {
        id,
      },
    });
  }
}
