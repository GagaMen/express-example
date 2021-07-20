import config from './../config';
import { Service } from 'typedi';
import winston, { Logger } from 'winston';

@Service()
export class LoggingService {
    protected logger: Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: config.logging.level,
            silent: config.logging.silent,
            transports: [
                new winston.transports.File({
                    dirname: config.logging.directory,
                    filename: 'error.log',
                    level: 'error',
                }),
                new winston.transports.File({
                    dirname: config.logging.directory,
                    filename: 'warn.log',
                    level: 'warn',
                }),
                new winston.transports.File({
                    dirname: config.logging.directory,
                    filename: 'info.log',
                    level: 'info',
                }),
                new winston.transports.Console({
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple(),
                    ),
                }),
                new winston.transports.File({
                    dirname: config.logging.directory,
                    filename: 'http.log',
                    level: 'http',
                }),
                new winston.transports.File({
                    dirname: config.logging.directory,
                    filename: 'verbose.log',
                    level: 'verbose',
                }),
                new winston.transports.File({
                    dirname: config.logging.directory,
                    filename: 'debug.log',
                    level: 'debug',
                }),
                new winston.transports.File({
                    dirname: config.logging.directory,
                    filename: 'silly.log',
                    level: 'silly',
                }),
            ],
        });
    }

    public log(level: string, message: string): void {
        this.logger.log(level, message);
    }

    public error(message: string): void {
        this.logger.log('error', message);
    }

    public warn(message: string): void {
        this.logger.log('warn', message);
    }

    public info(message: string): void {
        this.logger.log('info', message);
    }

    public http(message: string): void {
        this.logger.log('http', message);
    }

    public verbose(message: string): void {
        this.logger.log('verbose', message);
    }

    public debug(message: string): void {
        this.logger.log('debug', message);
    }

    public silly(message: string): void {
        this.logger.log('silly', message);
    }
}
