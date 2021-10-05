import { Request, Response, NextFunction } from 'express';
import { MissingDataError } from '../../error/missing-data.error';
import { injectable } from 'tsyringe';
import { Controller } from '../common/controller';
import { ExpenseService } from './expense.service';
import { ExpenseDTO } from '../../core/model/expense';
import { WrongDataError } from '../../error/wrong-data.error';

@injectable()
export class ExpenseController implements Controller {
    constructor(private expenseService: ExpenseService) {}

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

            const expense = await this.expenseService.list(limit, page);

            res.status(200).send(expense);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const expenseId: string | null = req.params['expenseId'] ?? null;

            if (expenseId === null) {
                throw new MissingDataError('No expense id provided.');
            }

            const expense = await this.expenseService.readByID(expenseId);

            res.status(200).send(expense);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const date = (req.body as ExpenseDTO).date ?? null;
            if (date === null) {
                throw new MissingDataError('Date is missing.');
            }

            const amount = (req.body as ExpenseDTO).amount ?? null;
            if (amount === null) {
                throw new MissingDataError('Amount is missing.');
            }

            const notice = (req.body as ExpenseDTO).notice ?? null;

            const category = (req.body as ExpenseDTO).category ?? null;
            if (category === null) {
                throw new MissingDataError('Category is missing.');
            }
            if (typeof category !== 'string') {
                throw new WrongDataError('Category is not type of string.');
            }

            const account = (req.body as ExpenseDTO).account ?? null;
            if (account === null) {
                throw new MissingDataError('Account is missing.');
            }
            if (typeof account !== 'string') {
                throw new WrongDataError('Account is not type of string.');
            }

            const expense = await this.expenseService.create({
                date: date,
                amount: amount,
                notice: notice,
                category: category,
                account: account,
            });

            res.status(200).send(expense);
        } catch (err) {
            next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const expenseId: string | null = req.params['expenseId'] ?? null;

            if (expenseId === null) {
                throw new MissingDataError('No expense id provided.');
            }

            const expenseDelta: ExpenseDTO = req.body as ExpenseDTO;
            const expense = await this.expenseService.update(expenseId, expenseDelta);

            res.status(200).send(expense);
        } catch (err) {
            next(err);
        }
    }

    async put(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const expenseId: string | null = req.params['expenseId'] ?? null;

            if (expenseId === null) {
                throw new MissingDataError('No expense id provided.');
            }

            const expenseDelta: ExpenseDTO = req.body as ExpenseDTO;
            if (
                expenseDelta.date === undefined ||
                expenseDelta.amount === undefined ||
                expenseDelta.notice === undefined ||
                expenseDelta.category === undefined ||
                expenseDelta.account === undefined
            ) {
                throw new MissingDataError('Missing data. Please provide a whole expense object.');
            }
            const expense = await this.expenseService.update(expenseId, expenseDelta);

            res.status(200).send(expense);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const expenseId: string | null = req.params['expenseId'] ?? null;

            if (expenseId === null) {
                throw new MissingDataError('No expense id provided.');
            }

            await this.expenseService.delete(expenseId);

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
