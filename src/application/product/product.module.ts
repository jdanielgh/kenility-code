import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from '../../controllers/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/insfrastructure/database/schemas/product.schema';
import { ProductRepository } from 'src/application/ports/product.abstract';
import { ProductMongoDbRepository } from 'src/insfrastructure/adapters/product.mongodb.repository';

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
