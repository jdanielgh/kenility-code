import { PartialType } from '@nestjs/mapped-types';
import { CreateProductOutputDto } from './create-product.output.dto';

export class UpdateProductDto extends PartialType(CreateProductOutputDto){

}