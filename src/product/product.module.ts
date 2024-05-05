import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductRepository } from 'src/ports/product.abastract';
import { ProductMongoDbRepository } from 'src/adapters/product.mongodb.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: ProductMongoDbRepository,
    },
  ],
  controllers: [ProductController],
})
export class ProductModule {}
