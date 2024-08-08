import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RestaurantsService {
  constructor(private readonly database: DatabaseService) {}

  async create(createRestaurantDto: Prisma.RestaurantCreateInput) {
    return this.database.restaurant.create({
      data: createRestaurantDto,
    });
  }

  async findAll() {
    return this.database.restaurant.findMany();
  }

  async findOne(id: number) {
    return this.database.restaurant.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRestaurantDto: Prisma.RestaurantUpdateInput) {
    return this.database.restaurant.update({
      where: {
        id,
      },
      data: updateRestaurantDto,
    });
  }

  remove(id: number) {
    return this.database.restaurant.delete({ where: { id } });
  }
}
