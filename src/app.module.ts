import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ItensModule } from './itens/itens.module';

@Module({
  imports: [DatabaseModule, ItensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
