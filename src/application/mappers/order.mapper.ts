import { Order } from "src/insfrastructure/database/schemas/order.schema";
import { CreateOrderDto } from "../order/dto/create-order.dto";

export class OrderMapper {
    static toDomain(data: Partial<CreateOrderDto>): Order {
        return new Order(data.orderId, data.name, data.total, data.productList);
    }

    static toDto(data: Order): CreateOrderDto {
        return new CreateOrderDto(data.orderId, data.name, data.total, data.productList);
    }
}