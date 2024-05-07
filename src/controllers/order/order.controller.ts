import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from 'src/application/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/application/order/dto/update-order.dto';
import { OrderService } from 'src/application/order/services/order.service';
import { Response } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async create(@Body() createOrder: CreateOrderDto) {
        try {
            const result = await this.orderService.createOrder(createOrder);
            if(result === null) throw new HttpException('Order already exists', HttpStatus.CONFLICT);
            return result
        } catch (error) {
            console.log(error);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':id')
    async update(@Body() updateOrder: UpdateOrderDto, @Param('id') id: string, @Res({ passthrough: true }) res: Response) {
        try {
            const result = await this.orderService.updateOrder(id, updateOrder);
            if(result === null) {
                res.status(HttpStatus.NOT_FOUND).send('Order not found');
                return;
            }
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async findAll() {
        try {
            const result = await this.orderService.getOrders();
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('highest-amount-sold')
    async highestAmountSold() {
        try {
            const result = await this.orderService.higthAmountSold();
            if(result === null) throw new HttpException('No orders found', HttpStatus.NOT_FOUND);
            return result;
        } catch (error) {
            console.log(error);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
