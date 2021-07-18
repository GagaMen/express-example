import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router): void => {
    app.use('/hello', route);

    route.get('/', (req: Request, res: Response) => {
        const queryParams = req.query;
        const name = (queryParams['name'] as string) ?? 'World';

        res.send(`Hello ${name}!`);
    });
};
