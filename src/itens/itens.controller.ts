import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItensService } from './itens.service';
import { Prisma } from '@prisma/client';

@Controller('itens')
export class ItensController {
  constructor(private readonly itensService: ItensService) {}

  @Post()
  create(@Body() createItenDto: Prisma.ItemCreateInput) {
    return this.itensService.create(createItenDto);
  }

  @Get()
  findAll() {
    return this.itensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itensService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItenDto: Prisma.ItemUpdateInput,
  ) {
    return this.itensService.update(+id, updateItenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itensService.remove(+id);
  }
}
