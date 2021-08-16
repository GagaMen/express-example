import { Schema } from 'mongoose';
import { Income } from './../../core/model/income';
import { accountSchema } from './account.schema';
import { transactionCategorySchema } from './transaction-category.schema';

export const incomeSchema = new Schema<Income>({
    data: Schema.Types.Date,
    amount: Schema.Types.Number,
    notice: Schema.Types.String,
    category: transactionCategorySchema,
    account: accountSchema,
});
