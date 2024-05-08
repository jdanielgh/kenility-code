import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from 'src/application/ports/product.abstract';
import { CreateProductInputDto } from '../dto/create-product.input.dto';
import { Product } from 'src/domain/entities/product.entity';

const mockProductRepository = {
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
  getProductBySku: jest.fn(),
  findAll: jest.fn(),
};
describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, {
        provide: ProductRepository,
        useValue: mockProductRepository,
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('Create', () => { 
    it('should create a product', async () => {
      const productDto: CreateProductInputDto = {
        sku: '123',
        name: 'product',
        picture: 'picture',
        price: '10'
      };
      const product: Product = {
        sku: '123',
        name: 'product',
        picture: 'picture',
        price: 10
      };
      mockProductRepository.create.mockReturnValue(product);

      const result = await service.create(productDto);

      expect(result).toEqual(product);
    });

    it('should return null if product already exists', async () => {
      const productDto: CreateProductInputDto = {
        sku: '123',
        name: 'product',
        picture: 'picture',
        price: '10'
      };
      mockProductRepository.create.mockReturnValue(null);

      const result = await service.create(productDto);

      expect(result).toBeNull();
    });
  })

  describe('Update', () => {
    it('should update a product', async () => {
      const product: Product = {
        sku: '123',
        name: 'product',
        picture: 'picture',
        price: 10
      };
      mockProductRepository.update.mockReturnValue(product);

      const result = await service.update('123', { name: 'new product' });

      expect(result).toEqual(product);
    });

    it('should return null if product does not exist', async () => {
      mockProductRepository.update.mockReturnValue(null);

      const result = await service.update('123', { name: 'new product' });

      expect(result).toBeNull();
    });
  })

  describe('findBySku', () => {
    it('should return a product', async () => {
      const product: Product = {
        sku: '123',
        name: 'product',
        picture: 'picture',
        price: 10
      };
      mockProductRepository.getProductBySku.mockReturnValue(product);

      const result = await service.findBySku('123');

      expect(result).toEqual(product);
    });

    it('should return null if product does not exist', async () => {
      mockProductRepository.getProductBySku.mockReturnValue(null);

      const result = await service.findBySku('123');

      expect(result).toBeNull();
    });
  })

});
