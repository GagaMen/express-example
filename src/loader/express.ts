import * as express from 'express';
import config from '../config/app.config';
import routes from '../api';
import logErrorMiddleware from '../middleware/log-error.middleware';
import catchAllErrorsMiddleware from '../middleware/catch-all-errors.middleware';

export default (app: express.Application): express.Application => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/status', (_, res) => {
        res.status(200).end();
    });
    app.head('/status', (_, res) => {
        res.status(200).end();
    });

    app.use(config.api.prefix, routes());

    app.use(logErrorMiddleware);
    app.use(catchAllErrorsMiddleware);

    return app;
};
