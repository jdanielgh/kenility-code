import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderController } from "src/insfrastructure/controllers/order/order.controller";
import { OrderMongoDbRepository } from "src/insfrastructure/adapters/order.mongodb.repository";
import { Order, OrderSchema } from "src/insfrastructure/database/schemas/order.schema";
import { OrderRepository } from "../ports/order.abstract";
import { ProductModule } from "../product/product.module";
import { OrderService } from "./services/order.service";

@Module({
    imports: [
      ProductModule,
      MongooseModule.forFeature([
        {
          name: Order.name,
          schema: OrderSchema,
        },
      ]),
    ],
    providers: [
      OrderService,
      {
        provide: OrderRepository,
        useClass: OrderMongoDbRepository,
      }
    ],
    controllers: [OrderController],
  })
  export class OrderModule {}