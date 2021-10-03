import { Router } from 'express';
import { container } from 'tsyringe';
import { AccountTypeRoutes } from './account-type/account-type.routes';
import { AccountRoutes } from './account/account.routes';
import { UserRoutes } from './user/user.routes';

export default (): Router => {
    const app = Router();

    const userRoutes = container.resolve(UserRoutes);
    userRoutes.registerRoutes(app);

    const accountTypeRoutes = container.resolve(AccountTypeRoutes);
    accountTypeRoutes.registerRoutes(app);

    const accountRoutes = container.resolve(AccountRoutes);
    accountRoutes.registerRoutes(app);

    return app;
};
