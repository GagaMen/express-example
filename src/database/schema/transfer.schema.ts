import { Schema } from 'mongoose';
import { Transfer } from '../../core/model/transfer';

export const transferSchema = new Schema<Transfer>({
    date: Schema.Types.Date,
    amount: Schema.Types.Number,
    notice: Schema.Types.String,
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
    },
});
