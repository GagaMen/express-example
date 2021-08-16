import { Schema } from 'mongoose';
import { Transfer } from './../../core/model/transfer';
import { accountSchema } from './account.schema';

export const transferSchema = new Schema<Transfer>({
    date: Schema.Types.Date,
    amount: Schema.Types.Number,
    notice: Schema.Types.String,
    from: accountSchema,
    to: accountSchema,
});
