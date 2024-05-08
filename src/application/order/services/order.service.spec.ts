import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderRepository } from 'src/application/ports/order.abstract';
import { Order } from 'src/domain/entities/order.entity';

const mockOrderRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
  higthestAmountSold: jest.fn(),
  getTotalSoldPrice: jest.fn(),
}

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, 
        { provide: OrderRepository, useValue: mockOrderRepository }
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create an order', async () => {
      const order: Order = {
        orderId: 1,
        name: 'userName',
        total: 100,
        productList: ['product1', 'product2'],
      };
      const orderDto = {
        orderId: '1',
        name: 'userName',
        productList: ['product1', 'product2'],
      };
      mockOrderRepository.create.mockReturnValue(order);

      const result = await service.createOrder(orderDto);

      expect(result).toEqual(order);
    });

    it('should return null if order is not created', async () => {
      const orderDto = {
        orderId: '1',
        name: 'userName',
        productList: ['product1', 'product2'],
      };
      mockOrderRepository.create.mockReturnValue(null);

      const result = await service.createOrder(orderDto);

      expect(result).toBeNull();
    });
  });

  describe('Update', () => {
    it('should update an order', async () => {
      const order: Order = {
        orderId: 1,
        name: 'userName',
        total: 100,
        productList: ['product1', 'product2'],
      };
      const orderDto = {
        orderId: '1',
        name: 'userName',
        productList: ['product1', 'product2'],
      };
      mockOrderRepository.update.mockReturnValue(order);

      const result = await service.updateOrder('1', orderDto);

      expect(result).toEqual(order);
    });

    it('should return null if order is not updated', async () => {
      const orderDto = {
        orderId: '1',
        name: 'userName',
        productList: ['product1', 'product2'],
      };
      mockOrderRepository.update.mockReturnValue(null);

      const result = await service.updateOrder('1', orderDto);

      expect(result).toBeNull();
    });
  });
  
});
