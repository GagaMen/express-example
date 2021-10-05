import { inject, injectable } from 'tsyringe';
import { Service } from '../common/service';
import { Income, IncomeDTO } from '../../core/model/income';
import { IncomeRepository } from '../../core/repository/income.repository';

@injectable()
export class IncomeService implements Service<Income> {
    constructor(@inject('IncomeRepository') private incomeRepository: IncomeRepository) {}

    async list(limit = 100, page = 1): Promise<Income[]> {
        return await this.incomeRepository.find(limit, page);
    }

    async readByID(incomeId: string): Promise<Income> {
        return await this.incomeRepository.findById(incomeId);
    }

    async create(income: IncomeDTO): Promise<Income> {
        return await this.incomeRepository.create(income);
    }

    async update(incomeId: string, incomeDelta: IncomeDTO): Promise<Income> {
        const income = await this.incomeRepository.findById(incomeId);

        if (incomeDelta.date !== undefined) {
            income.date = incomeDelta.date;
        }

        if (incomeDelta.amount !== undefined) {
            income.amount = incomeDelta.amount;
        }

        if (incomeDelta.notice !== undefined) {
            income.notice = incomeDelta.notice;
        }

        if (incomeDelta.category !== undefined) {
            income.category = incomeDelta.category;
        }

        if (incomeDelta.account !== undefined) {
            income.account = incomeDelta.account;
        }

        await this.incomeRepository.update(income);

        return income;
    }

    async delete(incomeId: string): Promise<void> {
        const income = await this.incomeRepository.findById(incomeId);

        return await this.incomeRepository.delete(income);
    }
}
