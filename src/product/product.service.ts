import { Injectable } from '@nestjs/common';
import type { CreateProductDto } from './dto/create-product.dto';
import type { ProductRepository } from 'src/ports/product.abastract';
import { ProductMapper } from 'src/mappers/product.mapper';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {
    console.log('ProductService constructor', productRepository);
  }

  async create(createProductDto: CreateProductDto): Promise<CreateProductDto> {
    const product = ProductMapper.toDomain(createProductDto);
    const productFromDb = await this.productRepository.create(product);
    const productDto = ProductMapper.toDto(productFromDb);
    return productDto;
  }
}
