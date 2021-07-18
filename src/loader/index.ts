import express from 'express';
import expressLoader from './express';
import mongodbLoader from './mongodb';

export default async (expressApp: express.Application): Promise<void> => {
    expressLoader(expressApp);
    await mongodbLoader();
};
