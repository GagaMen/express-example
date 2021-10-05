import { Request, Response, NextFunction } from 'express';
import { MissingDataError } from '../../error/missing-data.error';
import { injectable } from 'tsyringe';
import { Controller } from '../common/controller';
import { TransactionCategoryService } from './transaction-category.service';
import { TransactionCategoryDTO } from '../../core/model/transaction-category';

@injectable()
export class TransactionCategoryController implements Controller {
    constructor(private transactionCategoryService: TransactionCategoryService) {}

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

            const transactionCategories = await this.transactionCategoryService.list(limit, page);

            res.status(200).send(transactionCategories);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId: string | null = req.params['categoryId'] ?? null;

            if (categoryId === null) {
                throw new MissingDataError('No expense id provided.');
            }

            const expense = await this.transactionCategoryService.readByID(categoryId);

            res.status(200).send(expense);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const name = (req.body as TransactionCategoryDTO).name ?? null;
            if (name === null) {
                throw new MissingDataError('Name is missing.');
            }

            const type = (req.body as TransactionCategoryDTO).type ?? null;
            if (type === null) {
                throw new MissingDataError('Type is missing.');
            }

            const transactionCategory = await this.transactionCategoryService.create({
                name: name,
                type: type,
            });

            res.status(200).send(transactionCategory);
        } catch (err) {
            next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId: string | null = req.params['categoryId'] ?? null;

            if (categoryId === null) {
                throw new MissingDataError('No transaction category id provided.');
            }

            const transactionCategoryDelta: TransactionCategoryDTO =
                req.body as TransactionCategoryDTO;
            const transactionCategory = await this.transactionCategoryService.update(
                categoryId,
                transactionCategoryDelta,
            );

            res.status(200).send(transactionCategory);
        } catch (err) {
            next(err);
        }
    }

    async put(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId: string | null = req.params['categoryId'] ?? null;

            if (categoryId === null) {
                throw new MissingDataError('No transaction category id provided.');
            }

            const transactionCategoryDelta: TransactionCategoryDTO =
                req.body as TransactionCategoryDTO;
            if (
                transactionCategoryDelta.name === undefined ||
                transactionCategoryDelta.type === undefined
            ) {
                throw new MissingDataError(
                    'Missing data. Please provide a whole transaction category object.',
                );
            }
            const transactionCategory = await this.transactionCategoryService.update(
                categoryId,
                transactionCategoryDelta,
            );

            res.status(200).send(transactionCategory);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId: string | null = req.params['categoryId'] ?? null;

            if (categoryId === null) {
                throw new MissingDataError('No transaction category id provided.');
            }

            await this.transactionCategoryService.delete(categoryId);

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
