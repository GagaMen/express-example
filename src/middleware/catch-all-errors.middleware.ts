import { NextFunction, Request, Response } from 'express';

interface StatusCodeMap {
    [key: string]: number;
}

const statusCodeMap: StatusCodeMap = {
    MissingDataError: 400,
    NotFoundError: 404,
    WrongDataError: 400,
};

export default (err: Error, _req: Request, res: Response, _: NextFunction): void => {
    const statusCode = (statusCodeMap[err.constructor.name] as number) ?? 500;
    const errorMessage = {
        error: {
            message: err.message,
            type: err.constructor.name,
        },
    };

    res.status(statusCode).send(errorMessage);
};
