import { transactionCategorySchema } from './transaction-category.schema';
import { Schema } from 'mongoose';
import { Expense } from './../../core/model/expense';
import { accountSchema } from './account.schema';

export const expenseSchema = new Schema<Expense>({
    data: Schema.Types.Date,
    amount: Schema.Types.Number,
    notice: Schema.Types.String,
    category: transactionCategorySchema,
    account: accountSchema,
});
