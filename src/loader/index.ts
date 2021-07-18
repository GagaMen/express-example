import express from 'express';
import expressLoader from './express';

export function initLoaders(expressApp: express.Application): void {
    expressLoader(expressApp);
}
