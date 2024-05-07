import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { ProductService } from '../application/product/services/product.service';
import { CreateProductDto } from '../application/product/dto/create-product.dto';
import { UpdateProductDto } from '../application/product/dto/update-product.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto, @Res({ passthrough: true }) res: Response) {
      try {
        const result =  await this.productService.create(createProductDto);
        if(result === null) {
          res.status(HttpStatus.CONFLICT).send('Product already exists');
          return;
        }
        return result;
      } catch (error) {
        console.log(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Patch(':sku')
    async update(@Body() updateProductDto: UpdateProductDto, @Res({ passthrough: true }) res: Response, @Param('sku') sku: string) {
      try {
        const result = await this.productService.update(sku, updateProductDto);
        if(result === null) {
          res.status(HttpStatus.NOT_FOUND).send('Products not found');
          return;
        }
        return result;
      } catch (error) {
        console.log(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get(':sku')
    async findBySku(@Param('sku') sku: string, @Res({ passthrough: true }) res: Response) {
      try {
        const result = await this.productService.findBySku(sku);
        if(result === null) {
          res.status(HttpStatus.NOT_FOUND).send('Products not found');
          return;
        }
        return result;
      } catch (error) {
        console.log(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Delete(':sku')
    async delete(@Param('sku') sku: string, @Res({ passthrough: true }) res: Response) {
      try {
        const result = await this.productService.delete(sku);
        if(result === null) {
          res.status(HttpStatus.NOT_FOUND).send('Products not found');
          return;
        }
        return result;
      } catch (error) {
        console.log(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get()
    async findAll() {
      try {
        return await this.productService.findAll();
      } catch (error) {
        console.log(error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
