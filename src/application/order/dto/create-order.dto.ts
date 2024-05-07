import { IsNotEmpty, IsString, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateOrderDto {

    constructor(orderId: string, name: string, total: number, productList: string[]) {
        this.orderId = orderId;
        this.name = name;
        this.total = total;
        this.productList = productList;
    }

    @IsNotEmpty()
    @IsString()
    readonly orderId: string;

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsNumber()
    readonly total: number;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    readonly productList: string[];
}
