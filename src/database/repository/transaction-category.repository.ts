import { DatabaseService } from '../database.service';
import { TransactionCategory, TransactionCategoryDTO } from '../../core/model/transaction-category';
import { TransactionCategoryRepository } from '../../core/repository/transaction-category.repository';
import { Model } from 'mongoose';
import { transactionCategorySchema } from '../schema/transaction-category.schema';
import { injectable } from 'tsyringe';

@injectable()
export class ConcreteTransactionCategoryRepository implements TransactionCategoryRepository {
    private transactionCategoryModel: Model<TransactionCategory>;

    constructor(databaseService: DatabaseService) {
        this.transactionCategoryModel = databaseService.connection.model<TransactionCategory>(
            'TransactionCategory',
            transactionCategorySchema,
        );
    }

    async findById(id: string): Promise<TransactionCategory> {
        const transferCategory = await this.transactionCategoryModel.findById(id);

        if (transferCategory === null) {
            throw new Error(`TransferCategory not found by using '${id}' as id`);
        }

        return transferCategory;
    }

    async create(transferCategory: TransactionCategoryDTO): Promise<TransactionCategory> {
        return await this.transactionCategoryModel.create(transferCategory);
    }

    async delete(transferCategory: TransactionCategory): Promise<void> {
        await this.transactionCategoryModel.findByIdAndDelete(transferCategory.id);
    }

    async update(transferCategory: TransactionCategory): Promise<void> {
        await this.transactionCategoryModel.findByIdAndUpdate(transferCategory.id, {
            name: transferCategory.name,
            type: transferCategory.type,
        });
    }
}
