import { Router } from 'express';
import { injectable } from 'tsyringe';
import { Route } from '../common/route';
import { TransferController } from './transfer.controller';

@injectable()
export class TransferRoutes implements Route {
    private transferRouter: Router = Router();

    constructor(private transferController: TransferController) {}

    registerRoutes(appRouter: Router): void {
        appRouter.use('/transfer', this.transferRouter);

        this.transferRouter
            .route('/')
            .get(this.transferController.getAll.bind(this.transferController))
            .post(this.transferController.create.bind(this.transferController));

        this.transferRouter
            .route('/:transferId')
            .get(this.transferController.getById.bind(this.transferController))
            .patch(this.transferController.patch.bind(this.transferController))
            .put(this.transferController.put.bind(this.transferController))
            .delete(this.transferController.delete.bind(this.transferController));
    }
}
