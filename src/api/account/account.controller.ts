import { Request, Response, NextFunction } from 'express';
import { WrongDataError } from '../../error/wrong-data.error';
import { injectable } from 'tsyringe';
import { AccountDTO } from '../../core/model/account';
import { MissingDataError } from '../../error/missing-data.error';
import { Controller } from '../common/controller';
import { AccountService } from './account.service';

@injectable()
export class AccountController implements Controller {
    constructor(private accountService: AccountService) {}

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

            const account = await this.accountService.list(limit, page);

            res.status(200).send(account);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accountId: string | null = req.params['accountId'] ?? null;

            if (accountId === null) {
                throw new MissingDataError('No account id provided.');
            }

            const account = await this.accountService.readByID(accountId);

            res.status(200).send(account);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const name = (req.body as AccountDTO).name ?? null;
            if (name === null) {
                throw new MissingDataError('Name is missing.');
            }

            const description = (req.body as AccountDTO).description ?? null;

            const balance = (req.body as AccountDTO).balance ?? null;
            if (balance === null) {
                throw new MissingDataError('Balance is missing.');
            }

            const user = (req.body as AccountDTO).user ?? null;
            if (user === null) {
                throw new MissingDataError('User is missing.');
            }
            if (typeof user !== 'string') {
                throw new WrongDataError('User is not type of string.');
            }

            const type = (req.body as AccountDTO).type ?? null;
            if (type === null) {
                throw new MissingDataError('Type is missing.');
            }
            if (typeof type !== 'string') {
                throw new WrongDataError('Type is not type of string.');
            }

            const account = await this.accountService.create({
                name: name,
                description: description,
                balance: balance,
                user: user,
                type: type,
            });

            res.status(200).send(account);
        } catch (err) {
            next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accountId: string | null = req.params['accountId'] ?? null;

            if (accountId === null) {
                throw new MissingDataError('No account id provided.');
            }

            const accountDelta: AccountDTO = req.body as AccountDTO;
            const account = await this.accountService.update(accountId, accountDelta);

            res.status(200).send(account);
        } catch (err) {
            next(err);
        }
    }

    async put(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accountId: string | null = req.params['accountId'] ?? null;

            if (accountId === null) {
                throw new MissingDataError('No account id provided.');
            }

            const accountDelta: AccountDTO = req.body as AccountDTO;
            if (
                accountDelta.name === undefined ||
                accountDelta.description === undefined ||
                accountDelta.balance === undefined ||
                accountDelta.user === undefined ||
                accountDelta.type === undefined
            ) {
                throw new MissingDataError('Missing data. Please provide a whole account object.');
            }
            const account = await this.accountService.update(accountId, accountDelta);

            res.status(200).send(account);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const accountId: string | null = req.params['accountId'] ?? null;

            if (accountId === null) {
                throw new MissingDataError('No account id provided.');
            }

            await this.accountService.delete(accountId);

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
