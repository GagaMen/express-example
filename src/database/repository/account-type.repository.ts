import { Model } from 'mongoose';
import { injectable } from 'tsyringe';
import { DatabaseService } from '../database.service';
import { accountTypeSchema } from '../schema/account-type.schema';
import { AccountType, AccountTypeDTO } from '../../core/model/account-type';
import { AccountTypeRepository } from '../../core/repository/account-type.repository';

@injectable()
export class ConcreteAccountTypeRepository implements AccountTypeRepository {
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

    async findAll(): Promise<AccountType[]> {
        return await this.accountTypeModel.find({});
    }

    async find(limit: number, page: number): Promise<AccountType[]> {
        const offset = limit * (page - 1);

        return await this.accountTypeModel.find().limit(limit).skip(offset);
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
