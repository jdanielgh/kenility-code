import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ProductService } from '../application/product/services/product.service';
import { UpdateProductDto } from '../application/product/dto/update-product.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductInputDto } from 'src/application/product/dto/create-product.input.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseInterceptors(FileInterceptor('pictureFile', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.fieldname + '-' + uniqueSuffix)
        }
      })
    }))
    async create(@Body() createProductDto: CreateProductInputDto, @UploadedFile() file: any, @Res({ passthrough: true }) res: Response) {
      try {
        console.log('create', createProductDto);
        console.log('file', file.path)
        const productWithPictureUrl = file.path
          ? { ...createProductDto, picture: file.path } 
          : createProductDto;
        const result =  await this.productService.create(productWithPictureUrl);
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
