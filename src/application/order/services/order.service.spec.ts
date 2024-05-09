import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrderRepository } from 'src/application/ports/order.abstract';
import { SalesTotalForDateDto } from '../dto/sales-total-for-date.order.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from 'src/insfrastructure/database/schemas/order.schema';

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
        orderId: '1',
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
        orderId: '1',
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

  describe('highestAmountSold', () => {
    it('should return the highest amount sold', async () => {
      const resultExpected = new CreateOrderDto('1', 'userName', 100, ['product1', 'product2']);
      const orderDomain = new Order('1', 'userName', 100, ['product1', 'product2'] );
      mockOrderRepository.higthestAmountSold.mockReturnValue(orderDomain);

      const result = await service.getHigthestAmountSold();

      expect(result).toEqual(resultExpected);
    });

    it('should return null if there is no highest amount sold', async () => {
      mockOrderRepository.higthestAmountSold.mockReturnValue(null);

      const result = await service.getHigthestAmountSold();

      expect(result).toBeNull();
    });
  });

  describe('getSoldOrdersByDate', () => {
    it('should return the total sold price for a date range', async () => {
      mockOrderRepository.getTotalSoldPrice.mockReturnValue(100);
      const resultExpected = new SalesTotalForDateDto(100, '2021-01-01', '2021-01-02');

      const result = await service.getSoldOrdersByDate('2021-01-01', '2021-01-02');

      expect(result).toEqual(resultExpected);
    });

  });
  
});
