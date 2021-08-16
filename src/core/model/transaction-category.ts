import { TransactionCategoryType } from './transaction-category-type';

export class TransactionCategory {
    constructor(public id: number, public name: string, public type: TransactionCategoryType) {}
}

export type TransactionCategoryDTO = Pick<TransactionCategory, 'name' | 'type'>;
