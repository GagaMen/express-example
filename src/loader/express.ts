import * as express from 'express';
import config from '../config';
import routes from '../api';

export default (app: express.Application): express.Application => {
    app.get('/status', (_, res) => {
        res.status(200).end();
    });
    app.head('/status', (_, res) => {
        res.status(200).end();
    });

    app.use(config.api.prefix, routes());

    return app;
};
