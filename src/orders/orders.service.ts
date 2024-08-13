import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderInput } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly database: DatabaseService) {}

  private async getItemPrice(itemId: number, restaurantId: number) {
    const item = await this.database.item.findUnique({
      where: { id: itemId, restaurantId },
      select: { price: true },
    });
    if (!item) throw new BadRequestException('Invalid item');
    return item.price;
  }

  async create(createOrderDto: CreateOrderInput) {
    const bill = await this.database.bill.findUnique({
      where: { id: createOrderDto.billId },
    });
    if (!bill) throw new BadRequestException('Invalid billId');

    return this.database.order.create({
      data: {
        billId: createOrderDto.billId,
        OrderItens: {
          create: await Promise.all(
            createOrderDto.OrderItens.map(async (item) => {
              const itemPrice = await this.getItemPrice(
                item.itemId,
                bill.restaurantId,
              );
              return {
                itemId: item.itemId,
                quantity: item.quantity,
                price: itemPrice,
              };
            }),
          ),
        },
      },
    });
  }

  async findAll() {
    return this.database.order.findMany({
      include: {
        OrderItens: {
          select: {
            item: {
              select: {
                name: true,
              },
            },
            quantity: true,
            price: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.database.order.findUnique({
      where: { id },
      include: {
        OrderItens: {
          select: {
            item: {
              select: {
                name: true,
              },
            },
            quantity: true,
            price: true,
          },
        },
      },
    });
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
