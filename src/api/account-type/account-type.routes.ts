import { Router } from 'express';
import { injectable } from 'tsyringe';
import { Route } from '../common/route';
import { AccountTypeController } from './account-type.controller';

@injectable()
export class AccountTypeRoutes implements Route {
    private accountTypeRouter: Router = Router();

    constructor(private accountTypeController: AccountTypeController) {}

    registerRoutes(appRouter: Router): void {
        appRouter.use('/accountType', this.accountTypeRouter);

        this.accountTypeRouter
            .route('/')
            .get(this.accountTypeController.getAll.bind(this.accountTypeController))
            .post(this.accountTypeController.create.bind(this.accountTypeController));

        this.accountTypeRouter
            .route('/:accountTypeId')
            .get(this.accountTypeController.getById.bind(this.accountTypeController))
            .patch(this.accountTypeController.patch.bind(this.accountTypeController))
            .put(this.accountTypeController.put.bind(this.accountTypeController))
            .delete(this.accountTypeController.delete.bind(this.accountTypeController));
    }
}
