export abstract class DatabaseRepository<T> {
    abstract create(data: T): Promise<T>;
    abstract update(sku: string, data: T): Promise<T>;
    abstract delete(sku: string): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract findOne(sku: string): Promise<T>;
}