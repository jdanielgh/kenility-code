import type { Product } from "src/insfrastructure/database/schemas/product.schema";
import { DatabaseRepository } from "./database.abstract";

export abstract class ProductRepository extends DatabaseRepository<Product>{
    abstract getProductBySku(sku: string): Promise<Product>;
}
