import { Schema } from 'mongoose';
import { User } from './../../core/model/user';

export const userSchema = new Schema<User>({
    username: Schema.Types.String,
    password: Schema.Types.String,
});
