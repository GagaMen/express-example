import { Income, IncomeDTO } from '../model/income';

export interface IncomeRepository {
    findById(id: string): Promise<Income>;
    findAll(): Promise<Income[]>;
    create(income: IncomeDTO): Promise<Income>;
    delete(income: Income): Promise<void>;
    update(income: Income): Promise<void>;
}
