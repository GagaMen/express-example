import { Request, Response, NextFunction } from 'express';
import { WrongDataError } from '../../error/wrong-data.error';
import { IncomeDTO } from '../../core/model/income';
import { MissingDataError } from '../../error/missing-data.error';
import { Controller } from '../common/controller';
import { IncomeService } from './income.service';
import { injectable } from 'tsyringe';

@injectable()
export class IncomeController implements Controller {
    constructor(private incomeService: IncomeService) {}

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let limit: number | 'NaN' | undefined = Number(req.query['limit']);
            let page: number | 'NaN' | undefined = Number(req.query['page']);

            if (isNaN(limit)) {
                limit = undefined;
            }

            if (isNaN(page)) {
                page = undefined;
            }

            const income = await this.incomeService.list(limit, page);

            res.status(200).send(income);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const incomeId: string | null = req.params['incomeId'] ?? null;

            if (incomeId === null) {
                throw new MissingDataError('No income id provided.');
            }

            const income = await this.incomeService.readByID(incomeId);

            res.status(200).send(income);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const date = (req.body as IncomeDTO).date ?? null;
            if (date === null) {
                throw new MissingDataError('Date is missing.');
            }

            const amount = (req.body as IncomeDTO).amount ?? null;
            if (amount === null) {
                throw new MissingDataError('Amount is missing.');
            }

            const notice = (req.body as IncomeDTO).notice ?? null;

            const category = (req.body as IncomeDTO).category ?? null;
            if (category === null) {
                throw new MissingDataError('Category is missing.');
            }
            if (typeof category !== 'string') {
                throw new WrongDataError('Category is not type of string.');
            }

            const account = (req.body as IncomeDTO).account ?? null;
            if (account === null) {
                throw new MissingDataError('Account is missing.');
            }
            if (typeof account !== 'string') {
                throw new WrongDataError('Account is not type of string.');
            }

            const income = await this.incomeService.create({
                date: date,
                amount: amount,
                notice: notice,
                category: category,
                account: account,
            });

            res.status(200).send(income);
        } catch (err) {
            next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const incomeId: string | null = req.params['incomeId'] ?? null;

            if (incomeId === null) {
                throw new MissingDataError('No income id provided.');
            }

            const incomeDelta: IncomeDTO = req.body as IncomeDTO;
            const income = await this.incomeService.update(incomeId, incomeDelta);

            res.status(200).send(income);
        } catch (err) {
            next(err);
        }
    }

    async put(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const incomeId: string | null = req.params['incomeId'] ?? null;

            if (incomeId === null) {
                throw new MissingDataError('No income id provided.');
            }

            const incomeDelta: IncomeDTO = req.body as IncomeDTO;
            if (
                incomeDelta.date === undefined ||
                incomeDelta.amount === undefined ||
                incomeDelta.notice === undefined ||
                incomeDelta.category === undefined ||
                incomeDelta.account === undefined
            ) {
                throw new MissingDataError('Missing data. Please provide a whole income object.');
            }
            const income = await this.incomeService.update(incomeId, incomeDelta);

            res.status(200).send(income);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const incomeId: string | null = req.params['incomeId'] ?? null;

            if (incomeId === null) {
                throw new MissingDataError('No income id provided.');
            }

            await this.incomeService.delete(incomeId);

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
