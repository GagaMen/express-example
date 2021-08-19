import { AccountType, AccountTypeDTO } from '../model/account-type';

export interface AccountTypeRepository {
    findById(id: string): Promise<AccountType>;
    create(accountType: AccountTypeDTO): Promise<AccountType>;
    delete(accountType: AccountType): Promise<void>;
    update(accountType: AccountType): Promise<void>;
}
