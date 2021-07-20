import config from './../config';
import { Service } from 'typedi';
import winston, { Logger } from 'winston';
import { LogLevel } from './../model/logLevel';

@Service()
export class LoggingService {
    protected logger: Logger;

    constructor() {
        this.logger = winston.createLogger({
            level: config.logging.level,
            silent: config.logging.silent,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.printf(
                            (info: winston.Logform.TransformableInfo) =>
                                `${info.level}: ${info.message}`,
                        ),
                    ),
                }),
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
        this.logger.log(LogLevel.ERROR, message);
    }

    public warn(message: string): void {
        this.logger.log(LogLevel.WARN, message);
    }

    public info(message: string): void {
        this.logger.log(LogLevel.INFO, message);
    }

    public http(message: string): void {
        this.logger.log(LogLevel.HTTP, message);
    }

    public verbose(message: string): void {
        this.logger.log(LogLevel.VERBOSE, message);
    }

    public debug(message: string): void {
        this.logger.log(LogLevel.DEBUG, message);
    }

    public silly(message: string): void {
        this.logger.log(LogLevel.SILLY, message);
    }
}
