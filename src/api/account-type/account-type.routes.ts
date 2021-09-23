import { Router } from 'express';
import { injectable } from 'tsyringe';
import { AccountTypeController } from './account-type.controller';

@injectable()
export class AccountTypeRoutes {
    private accountTypeRouter: Router = Router();

    constructor(private accountTypeController: AccountTypeController) {}

    getRoutes(mainRouter: Router): void {
        mainRouter.use('/accountType', this.accountTypeRouter);

        this.accountTypeRouter
            .route('/')
            .get(this.accountTypeController.getAllAccountTypes.bind(this.accountTypeController))
            .post(this.accountTypeController.createAccountType.bind(this.accountTypeController));

        this.accountTypeRouter
            .route('/:accountTypeId')
            .get(this.accountTypeController.getAccountTypeById.bind(this.accountTypeController))
            .patch(this.accountTypeController.patchAccountType.bind(this.accountTypeController))
            .put(this.accountTypeController.putAccountType.bind(this.accountTypeController))
            .delete(this.accountTypeController.deleteAccountType.bind(this.accountTypeController));
    }
}
