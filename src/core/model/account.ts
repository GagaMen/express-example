import { AccountType } from './account-type';
import { User } from './user';

export class Account {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public balance: number,
        public user: User | string,
        public type: AccountType | string,
    ) {}
}

export type AccountDTO = Pick<Account, 'name' | 'description' | 'balance' | 'user' | 'type'>;
