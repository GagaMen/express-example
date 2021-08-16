import { AccountType, AccountTypeDTO } from './../model/account-type';

export interface IAccountTypeRepository {
    findById(id: string): Promise<AccountType>;
    create(accountType: AccountTypeDTO): Promise<AccountType>;
    delete(accountType: AccountType): Promise<void>;
    update(accountType: AccountType): Promise<void>;
}
