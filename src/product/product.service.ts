import { Injectable } from '@nestjs/common';
import type { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from 'src/ports/product.abastract';
import { ProductMapper } from 'src/mappers/product.mapper';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) { }

  async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    const product = ProductMapper.toDomain(createProductDto);
    const productFromDb = await this.productRepository.create(product);
    if(productFromDb === null) return null;
    const productDto = ProductMapper.toDto(productFromDb);
    return productDto;
  }

  async update(id: string, data: UpdateProductDto): Promise<CreateProductDto> {
    const product = ProductMapper.toDomain(data);
    const productFromDb = await this.productRepository.update(id, product);
    const productDto = ProductMapper.toDto(productFromDb);
    return productDto;
  }

  async delete(sku: string): Promise<CreateProductDto> {
    const productFromDb = await this.productRepository.delete(sku);
    const productDto = ProductMapper.toDto(productFromDb);
    return productDto;
  }

  async findBySku(sku: string): Promise<CreateProductDto> {
    const productFromDb = await this.productRepository.getProductBySku(sku);
    if(productFromDb === null) return null;
    const productDto = ProductMapper.toDto(productFromDb);
    return productDto;
  }

  async findAll(): Promise<CreateProductDto[]> {
    const productsFromDb = await this.productRepository.findAll();
    const productsDto = productsFromDb.map(ProductMapper.toDto);
    return productsDto;
  }
}
