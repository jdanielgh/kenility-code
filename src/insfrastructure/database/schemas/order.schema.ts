import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  })
export class Order {

    constructor(orderId: string, name: string, total: number, productList: string[]) {
        this.orderId = orderId;
        this.name = name;
        this.total = total;
        this.productList = productList;
    }

    @Prop({ required: true, unique: true})
    orderId: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    total: number;

    @Prop({ required: true })
    productList: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);