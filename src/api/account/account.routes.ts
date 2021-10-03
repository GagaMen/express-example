import { Router } from 'express';
import { injectable } from 'tsyringe';
import { Route } from '../common/route';
import { AccountController } from './account.controller';

@injectable()
export class AccountRoutes implements Route {
    private accountRouter: Router = Router();

    constructor(private accountController: AccountController) {}

    registerRoutes(appRouter: Router): void {
        appRouter.use('/account', this.accountRouter);

        this.accountRouter
            .route('/')
            .get(this.accountController.getAll.bind(this.accountController))
            .post(this.accountController.create.bind(this.accountController));

        this.accountRouter
            .route('/:accountId')
            .get(this.accountController.getById.bind(this.accountController))
            .patch(this.accountController.patch.bind(this.accountController))
            .put(this.accountController.put.bind(this.accountController))
            .delete(this.accountController.delete.bind(this.accountController));
    }
}
