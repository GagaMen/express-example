import { Router } from 'express';
import { container } from 'tsyringe';
import hello from './routes/hello';
import { UserRoutes } from './user/user.routes';

export default (): Router => {
    const app = Router();
    hello(app);

    const userRoutes = container.resolve(UserRoutes);
    userRoutes.getRoutes(app);

    return app;
};
