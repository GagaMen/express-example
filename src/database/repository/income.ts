import { incomeSchema } from './../schema/income.schema';
import { DatabaseService } from './../database';
import { Model } from 'mongoose';
import { Income, IncomeDTO } from './../../core/model/income';
import { IIncomeRepository } from './../../core/repository/income';

export class IncomeRepository implements IIncomeRepository {
    private incomeModel: Model<Income>;

    constructor(databaseService: DatabaseService) {
        this.incomeModel = databaseService.connection.model<Income>('Income', incomeSchema);
    }

    async findById(id: string): Promise<Income> {
        const income = await this.incomeModel.findById(id);

        if (income === null) {
            throw new Error(`Income not found by using '${id}' as id`);
        }

        return income;
    }

    async create(income: IncomeDTO): Promise<Income> {
        return await this.incomeModel.create(income);
    }

    async delete(income: Income): Promise<void> {
        await this.incomeModel.findByIdAndDelete(income.id);
    }

    async update(income: Income): Promise<void> {
        await this.incomeModel.findByIdAndUpdate(income.id, {
            date: income.date,
            amount: income.amount,
            notice: income.notice,
            category: income.category,
            account: income.account,
        });
    }
}
