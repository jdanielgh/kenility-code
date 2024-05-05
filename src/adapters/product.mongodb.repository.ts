import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductMapper } from "src/mappers/product.mapper";
import { ProductRepository } from "src/ports/product.abastract";
import { Product, ProductDocument } from "src/schemas/product.schema";

@Injectable()
export class ProductMongoDbRepository implements ProductRepository {
    
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

    async create(createProductDto: Product): Promise<Product> {
        const product = new this.productModel(createProductDto);
        const result = await product.save()
        return ProductMapper.toDomain(result);
    }
    async update(id: string, data: Product): Promise<Product> {
        throw new Error('Method not implemented.');
    }
    async delete(id: string): Promise<Product> {
        throw new Error('Method not implemented.');
    }
    async findAll(): Promise<Product[]> {
        throw new Error('Method not implemented.');
    }
    async findOne(id: string): Promise<Product> {
        throw new Error('Method not implemented.');
    }
    async getProductBySku(sku: string): Promise<Product> {
        throw new Error('Method not implemented.');
    }
}