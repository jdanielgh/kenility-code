import { Injectable } from '@nestjs/common';
import type { CreateProductOutputDto } from '../dto/create-product.output.dto';
import { ProductRepository } from 'src/application/ports/product.abstract';
import { ProductMapper } from 'src/application/mappers/product.mapper';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CreateProductInputDto } from '../dto/create-product.input.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) { }

  async create(createProductDto: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const product = ProductMapper.toDomain(createProductDto);
    const productFromDb = await this.productRepository.create(product);
    if(productFromDb === null) return null;
    const productDto = ProductMapper.toDto(productFromDb);
    return productDto;
  }

  async update(id: string, data: UpdateProductDto): Promise<CreateProductOutputDto> {
    const product = ProductMapper.toDomainUpdate(data);
    const productFromDb = await this.productRepository.update(id, product);
    if(!productFromDb) return null;
    const productDto = ProductMapper.toDto(productFromDb);
    return productDto;
  }

  async delete(sku: string): Promise<CreateProductOutputDto> {
    const productFromDb = await this.productRepository.delete(sku);
    const productDto = ProductMapper.toDto(productFromDb);
    return productDto;
  }

  async findBySku(sku: string): Promise<CreateProductOutputDto> {
    const productFromDb = await this.productRepository.getProductBySku(sku);
    if(productFromDb === null) return null;
    const productDto = ProductMapper.toDto(productFromDb);
    return productDto;
  }

  async findAll(): Promise<CreateProductOutputDto[]> {
    const productsFromDb = await this.productRepository.findAll();
    const productsDto = productsFromDb.map(ProductMapper.toDto);
    return productsDto;
  }
}
