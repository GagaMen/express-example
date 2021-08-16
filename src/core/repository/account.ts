import { Account, AccountDTO } from './../model/account';

export interface IAccountRepository {
    findById(id: string): Promise<Account>;
    create(account: AccountDTO): Promise<Account>;
    delete(account: Account): Promise<void>;
    update(account: Account): Promise<void>;
}
