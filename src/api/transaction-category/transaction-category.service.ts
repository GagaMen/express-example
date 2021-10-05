import { inject, injectable } from 'tsyringe';
import { Service } from '../common/service';
import { TransactionCategory, TransactionCategoryDTO } from '../../core/model/transaction-category';
import { TransactionCategoryRepository } from '../../core/repository/transaction-category.repository';

@injectable()
export class TransactionCategoryService implements Service<TransactionCategory> {
    constructor(
        @inject('TransactionCategoryRepository')
        private transactionCategoryRepository: TransactionCategoryRepository,
    ) {}

    async list(limit = 100, page = 1): Promise<TransactionCategory[]> {
        return await this.transactionCategoryRepository.find(limit, page);
    }

    async readByID(transactionCategoryId: string): Promise<TransactionCategory> {
        return await this.transactionCategoryRepository.findById(transactionCategoryId);
    }

    async create(transactionCategory: TransactionCategoryDTO): Promise<TransactionCategory> {
        return await this.transactionCategoryRepository.create(transactionCategory);
    }

    async update(
        transactionCategoryId: string,
        transactionCategoryDelta: TransactionCategoryDTO,
    ): Promise<TransactionCategory> {
        const transactionCategory = await this.transactionCategoryRepository.findById(
            transactionCategoryId,
        );

        if (transactionCategoryDelta.name !== undefined) {
            transactionCategory.name = transactionCategoryDelta.name;
        }

        if (transactionCategoryDelta.type !== undefined) {
            transactionCategory.type = transactionCategoryDelta.type;
        }

        await this.transactionCategoryRepository.update(transactionCategory);

        return transactionCategory;
    }

    async delete(transactionCategoryId: string): Promise<void> {
        const transactionCategory = await this.transactionCategoryRepository.findById(
            transactionCategoryId,
        );

        return await this.transactionCategoryRepository.delete(transactionCategory);
    }
}
