import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductMapper } from 'src/application/mappers/product.mapper';
import { ProductRepository } from 'src/application/ports/product.abstract';
import { Product, ProductDocument } from 'src/insfrastructure/database/schemas/product.schema';

@Injectable()
export class ProductMongoDbRepository implements ProductRepository {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

  async create(createProductDto: Product): Promise<Product> {
    const productFromDb = await this.productModel.findOne({ sku: createProductDto.sku }).exec();
    if (productFromDb) return null;
    const product = new this.productModel(createProductDto);
    const result = await product.save();
    return ProductMapper.DboToDomain(result);
  }
  async update(sku: string, data: Product): Promise<Product> {
    const product = await this.productModel.findOneAndUpdate({ sku }, data, { new: true }).exec();
    if (!product) return null;
    return ProductMapper.DboToDomain(product);
  }
  async delete(sku: string): Promise<Product> {
    const product = await this.productModel.findOneAndDelete({ sku }).exec();
    return ProductMapper.DboToDomain(product);
  }
  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    return products.map(ProductMapper.DboToDomain);
  }
  async findOne(id: string): Promise<Product> {
    console.log('findOne', id);
    throw new Error('Method not implemented.');
  }
  async getProductBySku(sku: string): Promise<Product> {
    const product = await this.productModel.findOne({ sku }).exec();
    return product && ProductMapper.DboToDomain(product);
  }
}
