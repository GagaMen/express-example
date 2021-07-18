import express from 'express';
import config from './config';
import initLoaders from './loader';

async function startServer() {
    const app = express();
    await initLoaders(app);

    app.listen(config.server.port, () => {
        console.log(`server started at http://localhost:${config.server.port}`);
    });
}

void startServer();
