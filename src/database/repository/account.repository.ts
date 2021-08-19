import { Model } from 'mongoose';
import { injectable } from 'tsyringe';
import { DatabaseService } from '../database.service';
import { accountSchema } from '../schema/account.schema';
import { Account, AccountDTO } from '../../core/model/account';
import { AccountRepository } from '../../core/repository/account.repository';

@injectable()
export class ConcreteAccountRepository implements AccountRepository {
    private accountModel: Model<Account>;

    constructor(databaseService: DatabaseService) {
        this.accountModel = databaseService.connection.model<Account>('Account', accountSchema);
    }

    async findById(id: string): Promise<Account> {
        const account = await this.accountModel.findById(id);

        if (account === null) {
            throw new Error(`Account not found by using '${id}' as id`);
        }

        return account;
    }

    async create(account: AccountDTO): Promise<Account> {
        return await this.accountModel.create(account);
    }

    async delete(account: Account): Promise<void> {
        await this.accountModel.findByIdAndDelete(account.id);
    }

    async update(account: Account): Promise<void> {
        await this.accountModel.findByIdAndUpdate(account.id, {
            name: account.name,
            description: account.description,
            balance: account.balance,
            user: account.user,
            type: account.type,
        });
    }
}
