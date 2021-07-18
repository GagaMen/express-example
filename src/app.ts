import express, { Request, Response } from 'express';
import config from './config';
import initLoaders from './loader';

async function startServer() {
    const app = express();
    await initLoaders(app);

    app.get('/', (_: Request, res: Response) => {
        res.send('Hello world!');
    });

    app.listen(config.server.port, () => {
        console.log(`server started at http://localhost:${config.server.port}`);
    });
}

void startServer();
