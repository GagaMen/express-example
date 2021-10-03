import { Schema } from 'mongoose';
import { Account } from '../../core/model/account';

export const accountSchema = new Schema<Account>({
    name: Schema.Types.String,
    description: Schema.Types.String,
    balance: Schema.Types.String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'AccountType',
    },
});
