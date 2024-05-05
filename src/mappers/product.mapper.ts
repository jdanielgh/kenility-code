import { CreateProductDto } from "src/product/dto/create-product.dto";
import { Product } from "src/schemas/product.schema";

export class ProductMapper {
    static toDomain(createProductDto: CreateProductDto) {
        return new Product(createProductDto.name, createProductDto.sku, createProductDto.price, createProductDto.picture);
    }
    static toDto(product: Product) {
        return new CreateProductDto(product.name, product.sku, product.price, product.picture);
    }
}