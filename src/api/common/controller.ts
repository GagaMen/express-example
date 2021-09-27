import { NextFunction, Request, Response } from 'express';

export interface Controller {
    getAll(reg: Request, res: Response, next: NextFunction): Promise<void>;
    getById(reg: Request, res: Response, next: NextFunction): Promise<void>;
    create(reg: Request, res: Response, next: NextFunction): Promise<void>;
    patch(reg: Request, res: Response, next: NextFunction): Promise<void>;
    put(reg: Request, res: Response, next: NextFunction): Promise<void>;
    delete(reg: Request, res: Response, next: NextFunction): Promise<void>;
}
