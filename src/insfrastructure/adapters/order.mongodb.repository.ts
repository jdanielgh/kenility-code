import { Injectable } from "@nestjs/common";
import { OrderRepository } from "src/application/ports/order.abstract";
import { Order, OrderDocument } from "../database/schemas/order.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderMapper } from "src/application/mappers/order.mapper";

Injectable()
export class OrderMongoDbRepository implements OrderRepository {
    constructor(@InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>) {}

    getTotalSoldPrice(startDate: number, endDate: number): Promise<number> {
        throw new Error("Method not implemented.");
    }
    higtherAmountSold(): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    async create(data: Order): Promise<Order> {
        const orderFromDB = await this.orderModel.findOne({orderId: data.orderId}).exec();
        if (orderFromDB) return null;
        const order = new this.orderModel(data);
        const result = await order.save();
        return OrderMapper.toDomain(result);
    }
    async update(id: string, data: Order): Promise<Order> {
        const result = await this.orderModel.findOneAndUpdate({ orderId: id }, data, {new: true}).exec();
        if(!result) return null;
        return OrderMapper.toDomain(result);
    }
    delete(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Order[]> {
        const orders = await this.orderModel.find().exec();
        return orders.map(order => OrderMapper.toDomain(order));
    }
    findOne(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

} 