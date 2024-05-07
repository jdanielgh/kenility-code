import { Order } from 'src/insfrastructure/database/schemas/order.schema';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { SalesTotalForDateDto } from '../order/dto/sales-total-for-date.order.dto';

export class OrderMapper {
  static toDomain(data: Partial<CreateOrderDto>): Order {
    return new Order(data.orderId, data.name, data.total, data.productList);
  }

  static toDto(data: Order): CreateOrderDto {
    return new CreateOrderDto(data.orderId, data.name, data.total, data.productList);
  }

  static toDtoSalesTotalForDate(data: number, startDate: string, endDate: string): SalesTotalForDateDto {
    return new SalesTotalForDateDto(data, startDate, endDate);
  }
}
