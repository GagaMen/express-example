import { Router } from 'express';
import { injectable } from 'tsyringe';
import { Route } from '../common/route';
import { UserController } from './user.controller';

@injectable()
export class UserRoutes implements Route {
    private userRouter: Router = Router();

    constructor(private userController: UserController) {}

    registerRoutes(appRouter: Router): void {
        appRouter.use('/user', this.userRouter);

        this.userRouter
            .route('/')
            .get(this.userController.getAll.bind(this.userController))
            .post(this.userController.create.bind(this.userController));

        this.userRouter
            .route('/:userId')
            .get(this.userController.getById.bind(this.userController))
            .patch(this.userController.patch.bind(this.userController))
            .put(this.userController.put.bind(this.userController))
            .delete(this.userController.delete.bind(this.userController));
    }
}
