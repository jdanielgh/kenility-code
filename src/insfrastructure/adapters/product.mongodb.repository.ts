import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductMapper } from "src/application/mappers/product.mapper";
import { ProductRepository } from "src/application/ports/product.abstract";
import { Product, ProductDocument } from "src/insfrastructure/database/schemas/product.schema";

@Injectable()
export class ProductMongoDbRepository implements ProductRepository {
    
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {}

    async create(createProductDto: Product): Promise<Product> {
        const productFromDb = await this.productModel.findOne({ sku: createProductDto.sku }).exec();
        if(productFromDb) return null;
        const product = new this.productModel(createProductDto);
        const result = await product.save()
        return ProductMapper.toDomain(result);
    }
    async update(sku: string, data: Product): Promise<Product> {
        const product = await this.productModel.findOneAndUpdate({ sku }, data, { new: true }).exec();
        return ProductMapper.toDomain(product);
    }
    async delete(sku: string): Promise<Product> {
        const product = await this.productModel.findOneAndDelete({ sku }).exec();
        return ProductMapper.toDomain(product);
    }
    async findAll(): Promise<Product[]> {
        const products = await this.productModel.find().exec();
        return products.map(ProductMapper.toDomain);
    }
    async findOne(id: string): Promise<Product> {
        throw new Error('Method not implemented.');
    }
    async getProductBySku(sku: string): Promise<Product> {
        const product = await this.productModel.findOne({ sku }).exec();
        return product && ProductMapper.toDomain(product); 
    }
}