import {
    IsNotEmpty,
    IsString,
    IsNumber,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateProductDto {
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