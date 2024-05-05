import {
    IsNotEmpty,
    IsString,
    IsNumber,
    MaxLength,
    MinLength,
  } from 'class-validator';  
  export class CreateProductDto {

    constructor(name: string, sku: string, price: number, picture: string) {
        this.name = name;
        this.sku = sku;
        this.price = price;
        this.picture = picture;
    }

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(300)
    sku: string;
  
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    picture: string;
  }