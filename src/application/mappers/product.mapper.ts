import { CreateProductOutputDto } from "src/application/product/dto/create-product.output.dto";
import { Product, ProductDocument } from "src/insfrastructure/database/schemas/product.schema";
import { CreateProductInputDto } from "../product/dto/create-product.input.dto";
import { UpdateProductDto } from "../product/dto/update-product.dto";

export class ProductMapper {
    static toDomain(createProductDto: Partial<CreateProductInputDto>) {
        return new Product(createProductDto.name, createProductDto.sku, parseInt(createProductDto.price), createProductDto.picture);
    }

    static DboToDomain(productDBO: ProductDocument) {
        return new Product(productDBO.name, productDBO.sku, productDBO.price, productDBO.picture);
    }

    static toDomainUpdate(updateProductDto: Partial<UpdateProductDto>) {
        return new Product(updateProductDto.name, updateProductDto.sku, updateProductDto.price, updateProductDto.picture);
    }
    static toDto(product: Product) {
        return new CreateProductOutputDto(product.name, product.sku, product.price, product.picture);
    }
}