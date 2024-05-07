import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrderSchema } from "src/insfrastructure/database/schemas/order.schema";
import { OrderRepository } from "../ports/order.abstract";
import { OrderMongoDbRepository } from "src/insfrastructure/adapters/order.mongodb.repository";
import { OrderService } from "./services/order.service";
import { OrderController } from "src/controllers/order/order.controller";

@Module({
    imports: [
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
      },
    ],
    controllers: [OrderController],
  })
  export class OrderModule {}