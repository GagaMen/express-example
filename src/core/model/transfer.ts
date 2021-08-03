import { Transaction } from './transaction';
import { Account } from './account';

export class Transfer extends Transaction {
    constructor(
        id: number,
        date: Date,
        amount: number,
        notice: string,
        public from: Account,
        public to: Account,
    ) {
        super(id, date, amount, notice);
    }
}
