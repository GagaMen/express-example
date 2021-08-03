import { TransactionCategory } from './transaction-category';
import { Transaction } from './transaction';
import { Account } from './account';

export class Income extends Transaction {
    constructor(
        id: number,
        date: Date,
        amount: number,
        notice: string,
        public category: TransactionCategory,
        public account: Account,
    ) {
        super(id, date, amount, notice);
    }
}
