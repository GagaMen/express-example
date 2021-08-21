import { expenseSchema } from '../schema/expense.schema';
import { Model } from 'mongoose';
import { DatabaseService } from '../database.service';
import { Expense, ExpenseDTO } from '../../core/model/expense';
import { ExpenseRepository } from '../../core/repository/expense.repository';
import { injectable } from 'tsyringe';

@injectable()
export class ConcreteExpenseRepository implements ExpenseRepository {
    private expenseModel: Model<Expense>;

    constructor(databaseService: DatabaseService) {
        this.expenseModel = databaseService.connection.model<Expense>('Expense', expenseSchema);
    }

    async findById(id: string): Promise<Expense> {
        const expense = await this.expenseModel.findById(id);

        if (expense === null) {
            throw new Error(`Expense not found by using '${id}' as id`);
        }

        return expense;
    }

    async findAll(): Promise<Expense[]> {
        return await this.expenseModel.find({});
    }

    async create(expense: ExpenseDTO): Promise<Expense> {
        return await this.expenseModel.create(expense);
    }

    async delete(expense: Expense): Promise<void> {
        await this.expenseModel.findByIdAndDelete(expense.id);
    }

    async update(expense: Expense): Promise<void> {
        await this.expenseModel.findByIdAndUpdate(expense.id, {
            date: expense.date,
            amount: expense.amount,
            notice: expense.notice,
            category: expense.category,
            account: expense.account,
        });
    }
}
