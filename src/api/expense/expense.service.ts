import { ExpenseRepository } from '../../core/repository/expense.repository';
import { inject, injectable } from 'tsyringe';
import { Expense, ExpenseDTO } from '../../core/model/expense';
import { Service } from '../common/service';

@injectable()
export class ExpenseService implements Service<Expense> {
    constructor(@inject('ExpenseRepository') private expenseRepository: ExpenseRepository) {}

    async list(limit = 100, page = 1): Promise<Expense[]> {
        return await this.expenseRepository.find(limit, page);
    }

    async readByID(expenseId: string): Promise<Expense> {
        return await this.expenseRepository.findById(expenseId);
    }

    async create(expense: ExpenseDTO): Promise<Expense> {
        return await this.expenseRepository.create(expense);
    }

    async update(expenseId: string, expenseDelta: ExpenseDTO): Promise<Expense> {
        const expense = await this.expenseRepository.findById(expenseId);

        if (expenseDelta.date !== undefined) {
            expense.date = expenseDelta.date;
        }

        if (expenseDelta.amount !== undefined) {
            expense.amount = expenseDelta.amount;
        }

        if (expenseDelta.notice !== undefined) {
            expense.notice = expenseDelta.notice;
        }

        if (expenseDelta.category !== undefined) {
            expense.category = expenseDelta.category;
        }

        if (expenseDelta.account !== undefined) {
            expense.account = expenseDelta.account;
        }

        await this.expenseRepository.update(expense);

        return expense;
    }

    async delete(expenseId: string): Promise<void> {
        const expense = await this.expenseRepository.findById(expenseId);

        return await this.expenseRepository.delete(expense);
    }
}
