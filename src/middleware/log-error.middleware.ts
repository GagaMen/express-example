import { NextFunction, Request, Response } from 'express';
import { Logger } from '../core/logging/logger';
import { container } from 'tsyringe';

export default (err: Error, _req: Request, _res: Response, next: NextFunction): void => {
    const logger: Logger = container.resolve('Logger');

    logger.error(`${err.stack ?? 'No stack trace available'}`);

    next(err);
};
