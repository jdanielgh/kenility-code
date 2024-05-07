import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/application/ports/order.abstract';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrderMapper } from 'src/application/mappers/order.mapper';

@Injectable()
export class OrderService {
    constructor(private readonly orderRepository: OrderRepository) { }

    async createOrder(order: CreateOrderDto) {
        const orderDomain = OrderMapper.toDomain(order);
        if(!orderDomain) return null;
        const orderCreated = await this.orderRepository.create(orderDomain);
        if(!orderCreated) return null;
        return OrderMapper.toDto(orderCreated);
    }

    async getOrders() {
        return await this.orderRepository.findAll();
    }

    async updateOrder(id: string, order: UpdateOrderDto) {
        const orderDomain = OrderMapper.toDomain(order);
        const OrderUpdated = await this.orderRepository.update(id, orderDomain);
        if(!OrderUpdated) return null;
        return OrderMapper.toDto(OrderUpdated);
    }

    async getHigthestAmountSold() {
        const order = await this.orderRepository.higthestAmountSold();
        if(!order) return null;
        return OrderMapper.toDto(order);
    }

    async getSoldOrdersByDate(startDate: string, endDate: string) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const total = await this.orderRepository.getTotalSoldPrice(start, end);
        return OrderMapper.toDtoSalesTotalForDate(total, startDate, endDate);
    }
}
