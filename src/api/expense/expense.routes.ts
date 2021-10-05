import { Router } from 'express';
import { injectable } from 'tsyringe';
import { Route } from '../common/route';
import { ExpenseController } from './expense.controller';

@injectable()
export class ExpenseRoutes implements Route {
    private expenseRouter: Router = Router();

    constructor(private expenseController: ExpenseController) {}

    registerRoutes(appRouter: Router): void {
        appRouter.use('/expense', this.expenseRouter);

        this.expenseRouter
            .route('/')
            .get(this.expenseController.getAll.bind(this.expenseController))
            .post(this.expenseController.create.bind(this.expenseController));

        this.expenseRouter
            .route('/:expenseId')
            .get(this.expenseController.getById.bind(this.expenseController))
            .patch(this.expenseController.patch.bind(this.expenseController))
            .put(this.expenseController.put.bind(this.expenseController))
            .delete(this.expenseController.delete.bind(this.expenseController));
    }
}
