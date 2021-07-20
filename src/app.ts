import 'reflect-metadata';

import express from 'express';
import config from './config';
import initLoaders from './loader';
import Container from 'typedi';
import { LoggingService } from './service/logging';

async function startServer() {
    const logger: LoggingService = Container.get(LoggingService);

    const app = express();
    await initLoaders(app);

    app.listen(config.server.port, () => {
        logger.info(`server started at http://localhost:${config.server.port}`);
    });
}

void startServer();
