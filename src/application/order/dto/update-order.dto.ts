import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsNumber()
    @IsOptional()
    readonly total?: number;

    @IsArray()
    @IsOptional()
    readonly productList?: string[];
}