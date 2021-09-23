import { injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { AccountTypeService } from './account-type.service';
import { MissingDataError } from '../../error/missing-data.error';
import { AccountTypeDTO } from '../../core/model/account-type';

@injectable()
export class AccountTypeController {
    constructor(private accountTypeService: AccountTypeService) {}

    async getAllAccountTypes(reg: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let limit: number | 'NaN' | undefined = Number(reg.query['limit']);
            let page: number | 'NaN' | undefined = Number(reg.query['page']);

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

    async getAccountTypeById(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    async createAccountType(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    async patchAccountType(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    async putAccountType(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    async deleteAccountType(req: Request, res: Response, next: NextFunction): Promise<void> {
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
