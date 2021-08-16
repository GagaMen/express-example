import express from 'express';
import expressLoader from './express';

export default (expressApp: express.Application): void => {
    expressLoader(expressApp);
};
