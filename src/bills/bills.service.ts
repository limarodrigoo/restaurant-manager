import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BillsService {
  constructor(private readonly database: DatabaseService) {}
  async create(createBillDto: Prisma.BillCreateInput) {
    return this.database.bill.create({ data: createBillDto });
  }

  async findAll() {
    return this.database.bill.findMany({
      include: {
        orders: {
          select: {
            OrderItens: {
              select: {
                item: { select: { name: true } },
                quantity: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.database.bill.findUnique({
      where: { id },
      include: {
        orders: {
          select: {
            OrderItens: {
              select: {
                item: { select: { name: true } },
                quantity: true,
                price: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, updateBillDto: Prisma.BillUpdateInput) {
    return this.database.bill.update({ where: { id }, data: updateBillDto });
  }

  async remove(id: number) {
    return this.database.bill.delete({ where: { id } });
  }
}
