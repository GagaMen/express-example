import { AccountType } from './account-type';
import { User } from './user';

export class Account {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public balance: number,
        public user: User,
        public type: AccountType,
    ) {}
}
