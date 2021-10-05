import { Router } from 'express';
import { injectable } from 'tsyringe';
import { Route } from '../common/route';
import { IncomeController } from './income.controller';

@injectable()
export class IncomeRoutes implements Route {
    private incomeRouter: Router = Router();

    constructor(private incomeController: IncomeController) {}

    registerRoutes(appRouter: Router): void {
        appRouter.use('/income', this.incomeRouter);

        this.incomeRouter
            .route('/')
            .get(this.incomeController.getAll.bind(this.incomeController))
            .post(this.incomeController.create.bind(this.incomeController));

        this.incomeRouter
            .route('/:incomeId')
            .get(this.incomeController.getById.bind(this.incomeController))
            .patch(this.incomeController.patch.bind(this.incomeController))
            .put(this.incomeController.put.bind(this.incomeController))
            .delete(this.incomeController.delete.bind(this.incomeController));
    }
}
