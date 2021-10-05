import { Router } from 'express';
import { container } from 'tsyringe';
import { AccountTypeRoutes } from './account-type/account-type.routes';
import { AccountRoutes } from './account/account.routes';
import { TransactionCategoryRoutes } from './transaction-category/transaction-category.routes';
import { TransferRoutes } from './transfer/transfer.routes';
import { UserRoutes } from './user/user.routes';

export default (): Router => {
    const app = Router();

    const userRoutes = container.resolve(UserRoutes);
    userRoutes.registerRoutes(app);

    const accountTypeRoutes = container.resolve(AccountTypeRoutes);
    accountTypeRoutes.registerRoutes(app);

    const accountRoutes = container.resolve(AccountRoutes);
    accountRoutes.registerRoutes(app);

    const transactionCategoryRoutes = container.resolve(TransactionCategoryRoutes);
    transactionCategoryRoutes.registerRoutes(app);

    const transferRoutes = container.resolve(TransferRoutes);
    transferRoutes.registerRoutes(app);

    return app;
};
