import { Schema } from 'mongoose';
import { Expense } from '../../core/model/expense';

export const expenseSchema = new Schema<Expense>({
    data: Schema.Types.Date,
    amount: Schema.Types.Number,
    notice: Schema.Types.String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'TransactionCategory',
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
});
