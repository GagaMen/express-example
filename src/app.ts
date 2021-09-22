import 'reflect-metadata';

import { Logger } from './core/logging/logger';
import express from 'express';
import initDependencyContainer from './config/dependency-container.config';
import config from './config/app.config';
import initLoaders from './loader';
import { container, inject, injectable } from 'tsyringe';

@injectable()
class Application {
    private app: express.Application;

    constructor(@inject('Logger') private logger: Logger) {
        this.app = express();
    }

    start(): void {
        initLoaders(this.app);

        this.app.listen(config.server.port, () => {
            this.logger.info(`server started at http://localhost:${config.server.port}`);
        });
    }
}

initDependencyContainer();
const app: Application = container.resolve(Application);

void app.start();
