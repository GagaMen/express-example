import { Expense, ExpenseDTO } from '../model/expense';

export interface ExpenseRepository {
    findById(id: string): Promise<Expense>;
    findAll(): Promise<Expense[]>;
    create(expense: ExpenseDTO): Promise<Expense>;
    delete(expense: Expense): Promise<void>;
    update(expense: Expense): Promise<void>;
}
