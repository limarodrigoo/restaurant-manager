import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BillsService {
  constructor(private readonly database: DatabaseService) {}
  async create(createBillDto: Prisma.BillCreateInput) {
    console.log(createBillDto);
    return this.database.bill.create({ data: createBillDto });
  }

  async findAll() {
    return this.database.bill.findMany();
  }

  async findOne(id: number) {
    return this.database.bill.findUnique({ where: { id } });
  }

  async update(id: number, updateBillDto: Prisma.BillUpdateInput) {
    return this.database.bill.update({ where: { id }, data: updateBillDto });
  }

  async remove(id: number) {
    return this.database.bill.delete({ where: { id } });
  }
}
