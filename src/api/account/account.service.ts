import { AccountRepository } from '../../core/repository/account.repository';
import { inject, injectable } from 'tsyringe';
import { Account, AccountDTO } from '../../core/model/account';
import { Service } from '../common/service';

@injectable()
export class AccountService implements Service<Account> {
    constructor(@inject('AccountRepository') private accountRepository: AccountRepository) {}

    async list(limit = 100, page = 1): Promise<Account[]> {
        return await this.accountRepository.find(limit, page);
    }

    async readByID(accountId: string): Promise<Account> {
        return await this.accountRepository.findById(accountId);
    }

    async create(account: AccountDTO): Promise<Account> {
        return await this.accountRepository.create(account);
    }

    async update(accountId: string, accountDelta: AccountDTO): Promise<Account> {
        const account = await this.accountRepository.findById(accountId);

        if (accountDelta.name !== undefined) {
            account.name = accountDelta.name;
        }

        if (accountDelta.description !== undefined) {
            account.description = accountDelta.description;
        }

        if (accountDelta.balance !== undefined) {
            account.balance = accountDelta.balance;
        }

        if (accountDelta.user !== undefined) {
            account.user = accountDelta.user;
        }

        if (accountDelta.type !== undefined) {
            account.type = accountDelta.type;
        }

        await this.accountRepository.update(account);

        return account;
    }

    async delete(accountId: string): Promise<void> {
        const account = await this.accountRepository.findById(accountId);

        return await this.accountRepository.delete(account);
    }
}
