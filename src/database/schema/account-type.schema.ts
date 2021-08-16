import { Schema } from 'mongoose';
import { AccountType } from './../../core/model/account-type';

export const accountTypeSchema = new Schema<AccountType>({
    name: Schema.Types.String,
});
