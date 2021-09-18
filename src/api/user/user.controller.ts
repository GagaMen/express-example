import { injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';
import { UserDTO } from '../../core/model/user';
import { UserService } from './user.service';
import { MissingDataError } from '../../error/missing-data.error';

@injectable()
export class UserController {
    constructor(private userService: UserService) {}

    async getAllUsers(reg: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let limit: number | 'NaN' | undefined = Number(reg.query['limit']);
            let page: number | 'NaN' | undefined = Number(reg.query['page']);

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

    async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    async patchUser(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    async putUser(req: Request, res: Response, next: NextFunction): Promise<void> {
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

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
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