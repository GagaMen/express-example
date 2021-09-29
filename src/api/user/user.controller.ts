import { injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../../core/model/user';
import { UserService } from './user.service';
import { MissingDataError } from '../../error/missing-data.error';
import { Controller } from '../common/controller';

@injectable()
export class UserController implements Controller {
    constructor(private userService: UserService) {}

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

            const users = await this.userService.list(limit, page);

            res.status(200).send(users);
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: string | null = req.params['userId'] ?? null;

            if (userId === null) {
                throw new MissingDataError('No user id provided.');
            }

            const user = await this.userService.readByID(userId);

            res.status(200).send(user);
        } catch (err) {
            next(err);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const username: string | null = (req.body as UserDTO).username ?? null;

            if (username === null) {
                throw new MissingDataError('Username is missing.');
            }

            const password: string | null = (req.body as UserDTO).password ?? null;

            if (password === null) {
                throw new MissingDataError('Password is missing.');
            }

            const user = await this.userService.create({
                username: username,
                password: password,
            });

            res.status(201).send(user);
        } catch (err) {
            next(err);
        }
    }

    async patch(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: string | null = req.params['userId'] ?? null;

            if (userId === null) {
                throw new MissingDataError('No user id provided.');
            }

            const userDelta: UserDTO = req.body as UserDTO;
            const user = await this.userService.update(userId, userDelta);

            res.status(200).send(user);
        } catch (err) {
            next(err);
        }
    }

    async put(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: string | null = req.params['userId'] ?? null;

            if (userId === null) {
                throw new MissingDataError('No user id provided.');
            }

            const userDelta: UserDTO = req.body as UserDTO;
            if (userDelta.username === undefined || userDelta.password === undefined) {
                throw new MissingDataError('Missing data. Please provide a whole user object.');
            }

            const user = await this.userService.update(userId, userDelta);

            res.status(200).send(user);
        } catch (err) {
            next(err);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId: string | null = req.params['userId'] ?? null;

            if (userId === null) {
                throw new MissingDataError('No user id provided.');
            }

            await this.userService.delete(userId);

            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
