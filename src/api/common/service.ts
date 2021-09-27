export interface Service<T> {
    list(limit: number, page: number): Promise<T[]>;
    readByID(id: string): Promise<T>;
    create(object: T): Promise<T>;
    update(id: string, objectDelta: T): Promise<T>;
    delete(id: string): Promise<void>;
}
