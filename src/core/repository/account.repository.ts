import { Account, AccountDTO } from '../model/account';

export interface AccountRepository {
    findById(id: string): Promise<Account>;
    findAll(): Promise<Account[]>;
    create(account: AccountDTO): Promise<Account>;
    delete(account: Account): Promise<void>;
    update(account: Account): Promise<void>;
}
