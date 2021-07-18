import * as express from 'express';

export default (app: express.Application): express.Application => {
    app.get('/status', (_, res) => {
        res.status(200).end();
    });
    app.head('/status', (_, res) => {
        res.status(200).end();
    });

    return app;
};
