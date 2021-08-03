import { Logger } from './core/interface/logger';
import 'reflect-metadata';

import express from 'express';
import config from './config';
import initLoaders from './loader';
import Container, { Service } from 'typedi';
import { InjectLogger } from './decorator/inject-logger';

@Service()
class Application {
    private app: express.Application;

    constructor(@InjectLogger() private logger: Logger) {
        this.app = express();
    }

    async start(): Promise<void> {
        await initLoaders(this.app);

        this.app.listen(config.server.port, () => {
            this.logger.info(`server started at http://localhost:${config.server.port}`);
        });
    }
}

const app: Application = Container.get(Application);

void app.start();
