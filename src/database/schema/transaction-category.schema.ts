import { TransactionCategory } from '../../core/model/transaction-category';
import { Schema } from 'mongoose';
export const transactionCategorySchema = new Schema<TransactionCategory>({
    name: Schema.Types.String,
    type: Schema.Types.Number,
});
