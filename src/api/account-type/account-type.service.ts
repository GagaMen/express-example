import { AccountType, AccountTypeDTO } from '../../core/model/account-type';
import { inject, injectable } from 'tsyringe';
import { AccountTypeRepository } from '../../core/repository/account-type.repository';

@injectable()
export class AccountTypeService {
    constructor(
        @inject('AccountTypeRepository') private accountTypeRepository: AccountTypeRepository,
    ) {}

    async list(limit = 100, page = 1): Promise<AccountType[]> {
        return await this.accountTypeRepository.find(limit, page);
    }

    async readByID(userId: string): Promise<AccountType> {
        return await this.accountTypeRepository.findById(userId);
    }

    async create(accountType: AccountTypeDTO): Promise<AccountType> {
        return await this.accountTypeRepository.create(accountType);
    }

    async update(accountTypeId: string, accountTypeDelta: AccountTypeDTO): Promise<AccountType> {
        const accountType: AccountType = await this.accountTypeRepository.findById(accountTypeId);

        if (accountTypeDelta.name !== undefined) {
            accountType.name = accountTypeDelta.name;
        }

        await this.accountTypeRepository.update(accountType);

        return accountType;
    }

    async delete(accountTypeId: string): Promise<void> {
        const accountType = await this.accountTypeRepository.findById(accountTypeId);

        return await this.accountTypeRepository.delete(accountType);
    }
}
