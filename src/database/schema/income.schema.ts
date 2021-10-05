import { Schema } from 'mongoose';
import { Income } from '../../core/model/income';

export const incomeSchema = new Schema<Income>({
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
