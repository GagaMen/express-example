import { Router } from 'express';
import { container } from 'tsyringe';
import { AccountTypeRoutes } from './account-type/account-type.routes';
import hello from './routes/hello';
import { UserRoutes } from './user/user.routes';

export default (): Router => {
    const app = Router();
    hello(app);

    const userRoutes = container.resolve(UserRoutes);
    userRoutes.getRoutes(app);

    const accountTypeRoutes = container.resolve(AccountTypeRoutes);
    accountTypeRoutes.getRoutes(app);

    return app;
};
