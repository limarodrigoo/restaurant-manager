import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ItensModule } from './itens/itens.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { BillsModule } from './bills/bills.module';

@Module({
  imports: [
    DatabaseModule,
    ItensModule,
    RestaurantsModule,
    OrdersModule,
    BillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
