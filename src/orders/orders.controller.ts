import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Prisma } from '@prisma/client';
import { CreateOrderInput } from './dto/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderInput) {
    if (!createOrderDto.billId) {
      throw new BadRequestException('Invalid input. Please provide billId.');
    }
    if (!createOrderDto.OrderItens || createOrderDto.OrderItens.length === 0) {
      throw new BadRequestException(
        'Invalid input. Please provide a proper OrderItens.',
      );
    }
    for (const item of createOrderDto.OrderItens) {
      if (!item.itemId || !item.quantity || item.quantity <= 0) {
        throw new BadRequestException(
          'Invalid item. Each item must have a valid itemId and a positive quantity.',
        );
      }
    }
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: Prisma.OrderUpdateInput,
  ) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
