export abstract class DatabaseRepository<T> {
    abstract create(data: T): Promise<T>;
    abstract update(id: string, data: T): Promise<T>;
    abstract delete(id: string): Promise<T>;
    abstract findAll(): Promise<T[]>;
    abstract findOne(id: string): Promise<T>;
}