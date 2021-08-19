import { accountTypeSchema } from './account-type.schema';
import { userSchema } from './user.schema';
import { Schema } from 'mongoose';
import { Account } from '../../core/model/account';

export const accountSchema = new Schema<Account>({
    name: Schema.Types.String,
    description: Schema.Types.String,
    balance: Schema.Types.String,
    user: userSchema,
    type: accountTypeSchema,
});
