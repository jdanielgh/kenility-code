import type { Order } from "src/insfrastructure/database/schemas/order.schema";
import { DatabaseRepository } from "./database.abstract";

export abstract class OrderRepository extends DatabaseRepository<Order>{
    abstract getTotalSoldPrice(startDate: number, endDate: number): Promise<number>;
    abstract higtherAmountSold(): Promise<Order>;
}
