import { Router } from 'express';
import { injectable } from 'tsyringe';
import { UserController } from './user.controller';

@injectable()
export class UserRoutes {
    private userRouter: Router = Router();

    constructor(private userController: UserController) {}

    getRoutes(mainRouter: Router): void {
        mainRouter.use('/user', this.userRouter);

        this.userRouter
            .route('/')
            .get(this.userController.getAllUsers.bind(this.userController))
            .post(this.userController.createUser.bind(this.userController));

        this.userRouter
            .route('/:userId')
            .get(this.userController.getUserById.bind(this.userController))
            .patch(this.userController.patchUser.bind(this.userController))
            .put(this.userController.putUser.bind(this.userController))
            .delete(this.userController.deleteUser.bind(this.userController));
    }
}
