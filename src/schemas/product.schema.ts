import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
})
export class Product {

  constructor(name: string, sku: string, price: number, picture: string) {
    this.name = name;
    this.sku = sku;
    this.price = price;
    this.picture = picture;
  }

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true})
  sku: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  picture: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);