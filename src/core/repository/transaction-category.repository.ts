import { TransactionCategory, TransactionCategoryDTO } from '../model/transaction-category';

export interface TransactionCategoryRepository {
    findById(id: string): Promise<TransactionCategory>;
    findAll(): Promise<TransactionCategory[]>;
    find(limit: number, page: number): Promise<TransactionCategory[]>;
    create(transferCategory: TransactionCategoryDTO): Promise<TransactionCategory>;
    delete(transferCategory: TransactionCategory): Promise<void>;
    update(transferCategory: TransactionCategory): Promise<void>;
}
