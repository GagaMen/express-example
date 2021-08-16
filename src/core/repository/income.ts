import { Income, IncomeDTO } from './../model/income';

export interface IIncomeRepository {
    findById(id: string): Promise<Income>;
    create(income: IncomeDTO): Promise<Income>;
    delete(income: Income): Promise<void>;
    update(income: Income): Promise<void>;
}
