import { Router } from 'express';

export interface Route {
    registerRoutes(appRouter: Router): void;
}
