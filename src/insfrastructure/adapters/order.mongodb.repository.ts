import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/application/ports/order.abstract';
import { Order, OrderDocument } from '../database/schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderMapper } from 'src/application/mappers/order.mapper';
import { Product, ProductDocument } from '../database/schemas/product.schema';

Injectable();
export class OrderMongoDbRepository implements OrderRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(data: Order): Promise<Order> {
    const orderFromDB = await this.orderModel.findOne({ orderId: data.orderId }).exec();
    if (orderFromDB) return null;

    const totalPrice = await this.getTotalPrice(data);
    const orderForStorage = {
      ...data,
      total: totalPrice,
    };
    const order = new this.orderModel(orderForStorage);
    const result = await order.save();
    return OrderMapper.toDomain(result);
  }

  private async getTotalPrice(order: Order): Promise<number> {
    const products = await this.productModel.find({ sku: { $in: order.productList } }).exec();
    console.log('Products:', products);
    this.validateProducts(products, order.productList);
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    console.log('totalPrice:', totalPrice);
    return totalPrice;
  }

  private validateProducts(products: Product[], productList: string[]): void {
    const result = productList.filter((product) => !products.some((p) => p.sku === product));
    if (result.length > 0)
      throw new BadRequestException('Error product sku validation', {
        cause: new Error(),
        description: `The following products do not exist: ${result.join(',')}`,
      });
  }

  async update(id: string, data: Order): Promise<Order> {
    const orderFromDB = await this.orderModel.findOne({ orderId: id }).exec();
    if (!orderFromDB) return null;
    if (data.productList && data.productList.length > 0) {
      const totalPrice = await this.getTotalPrice(data);
      data.total = totalPrice;
    }
    const result = await this.orderModel.findOneAndUpdate({ orderId: id }, data, { new: true }).exec();
    return OrderMapper.toDomain(result);
  }
  delete(id: string): Promise<Order> {
    console.log('delete-repository', id);
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.find().exec();
    return orders.map((order) => OrderMapper.toDomain(order));
  }

  findOne(id: string): Promise<Order> {
    console.log('findOne-repository', id);
    throw new Error('Method not implemented.');
  }

  async higthestAmountSold(): Promise<Order> {
    const highestTotalOrder = await this.orderModel.findOne().sort('-total').exec();

    if (!highestTotalOrder) return null;

    return OrderMapper.toDomain(highestTotalOrder);
  }

  async getTotalSoldPrice(startDate: Date, endDate: Date): Promise<number> {
    const orders = await this.orderModel
      .find({
        created: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .exec();
    const total = orders.reduce((sum, order) => sum + order.total, 0);
    return total || 0;
  }
}
