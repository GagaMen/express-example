import { Model } from 'mongoose';
import { DatabaseService } from '../database';
import { accountTypeSchema } from '../schema/account-type.schema';
import { AccountType, AccountTypeDTO } from './../../core/model/account-type';
import { IAccountTypeRepository } from './../../core/repository/account-type';

export class AccountTypeRepository implements IAccountTypeRepository {
    private accountTypeModel: Model<AccountType>;

    constructor(databaseService: DatabaseService) {
        this.accountTypeModel = databaseService.connection.model<AccountType>(
            'AccountType',
            accountTypeSchema,
        );
    }

    async findById(id: string): Promise<AccountType> {
        const accountType = await this.accountTypeModel.findById(id);

        if (accountType === null) {
            throw new Error(`AccountType not found by using '${id}' as id`);
        }

        return accountType;
    }

    async create(accountType: AccountTypeDTO): Promise<AccountType> {
        return await this.accountTypeModel.create(accountType);
    }

    async delete(accountType: AccountType): Promise<void> {
        await this.accountTypeModel.findByIdAndDelete(accountType.id);
    }

    async update(accountType: AccountType): Promise<void> {
        await this.accountTypeModel.findByIdAndUpdate(accountType.id, {
            name: accountType.name,
        });
    }
}
