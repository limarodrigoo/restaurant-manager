import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ItensModule } from './itens/itens.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { BillsModule } from './bills/bills.module';
import { AuthMiddleware } from './middelwares/auth.middleware';
import { ItensController } from './itens/itens.controller';
import { BillsController } from './bills/bills.controller';
import { OrdersController } from './orders/orders.controller';
import { RestaurantsController } from './restaurants/restaurants.controller';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        ItensController,
        BillsController,
        OrdersController,
        RestaurantsController,
      );
  }
}
