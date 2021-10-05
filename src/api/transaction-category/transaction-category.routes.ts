import { Router } from 'express';
import { injectable } from 'tsyringe';
import { Route } from '../common/route';
import { TransactionCategoryController } from './transaction-category.controller';

@injectable()
export class TransactionCategoryRoutes implements Route {
    private transactionCategoryRouter: Router = Router();

    constructor(private transactionCategoryController: TransactionCategoryController) {}

    registerRoutes(appRouter: Router): void {
        appRouter.use('/transactionCategory', this.transactionCategoryRouter);

        this.transactionCategoryRouter
            .route('/')
            .get(this.transactionCategoryController.getAll.bind(this.transactionCategoryController))
            .post(
                this.transactionCategoryController.create.bind(this.transactionCategoryController),
            );

        this.transactionCategoryRouter
            .route('/:categoryId')
            .get(
                this.transactionCategoryController.getById.bind(this.transactionCategoryController),
            )
            .patch(
                this.transactionCategoryController.patch.bind(this.transactionCategoryController),
            )
            .put(this.transactionCategoryController.put.bind(this.transactionCategoryController))
            .delete(
                this.transactionCategoryController.delete.bind(this.transactionCategoryController),
            );
    }
}
