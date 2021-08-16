import { TransactionCategory, TransactionCategoryDTO } from './../model/transaction-category';

export interface ITransactionCategoryRepository {
    findById(id: string): Promise<TransactionCategory>;
    create(transferCategory: TransactionCategoryDTO): Promise<TransactionCategory>;
    delete(transferCategory: TransactionCategory): Promise<void>;
    update(transferCategory: TransactionCategory): Promise<void>;
}
