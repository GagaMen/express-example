import { injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { AccountTypeService } from './account-type.service';
import { MissingDataError } from '../../error/missing-data.error';
import { AccountTypeDTO } from '../../core/model/account-type';
import { Controller } from '../common/controller';

@injectable()
export class AccountTypeController implements Controller {
    constructor(private accountTypeService: AccountTypeService) {}

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

            const accountTypes = await this.accountTypeService.list(limit, page);

            res.status(200).send(accountTypes);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accountTypeId: string | null = req.params['accountTypeId'] ?? null;

            if (accountTypeId === null) {
                throw new MissingDataError('No account type id provided.');
            }

            const accountType = await this.accountTypeService.readByID(accountTypeId);

            res.status(200).send(accountType);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const name: string | null = (req.body as AccountTypeDTO).name ?? null;

            if (name === null) {
                throw new MissingDataError('Name is missing.');
            }

            const accountType = await this.accountTypeService.create({
                name: name,
            });

            res.status(201).send(accountType);
        } catch (err) {
            next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accountTypeId: string | null = req.params['accountTypeId'] ?? null;

            if (accountTypeId === null) {
                throw new MissingDataError('No account type id provided.');
            }

            const accountTypeDelta: AccountTypeDTO = req.body as AccountTypeDTO;
            const accountType = await this.accountTypeService.update(
                accountTypeId,
                accountTypeDelta,
            );

            res.status(200).send(accountType);
        } catch (err) {
            next(err);
        }
    }

    async put(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accountTypeId: string | null = req.params['accountTypeId'] ?? null;

            if (accountTypeId === null) {
                throw new MissingDataError('No account type id provided.');
            }

            const accountTypeDelta: AccountTypeDTO = req.body as AccountTypeDTO;
            if (accountTypeDelta.name === undefined) {
                throw new MissingDataError(
                    'Missing data. Please provide a whole account type object.',
                );
            }

            const accountType = await this.accountTypeService.update(
                accountTypeId,
                accountTypeDelta,
            );

            res.status(200).send(accountType);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accountTypeId: string | null = req.params['accountTypeId'] ?? null;

            if (accountTypeId === null) {
                throw new MissingDataError('No account type id provided.');
            }

            await this.accountTypeService.delete(accountTypeId);

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
