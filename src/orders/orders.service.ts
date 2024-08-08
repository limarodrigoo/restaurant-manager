import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly database: DatabaseService) {}
  async create(createOrderDto: Prisma.OrderCreateInput) {
    return this.database.order.create({ data: createOrderDto });
  }

  async findAll() {
    return this.database.order.findMany({
      include: {
        OrderItens: {
          select: { item: true, quantity: true },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.database.order.findUnique({ where: { id } });
  }

  async update(id: number, updateOrderDto: Prisma.OrderUpdateInput) {
    return this.database.order.update({
      where: { id },
      data: updateOrderDto,
    });
  }

  async remove(id: number) {
    return this.database.order.delete({ where: { id } });
  }
}
