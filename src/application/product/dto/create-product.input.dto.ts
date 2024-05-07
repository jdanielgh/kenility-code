import {
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
  } from 'class-validator';  
  export class CreateProductInputDto {

    constructor(name: string, sku: string, price: string, picture: string) {
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
  
    @IsString()
    @IsNotEmpty()
    price: string;

    picture: string;
  }