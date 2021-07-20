import config from './../config';
import { Service } from 'typedi';
import winston, { Logger } from 'winston';
import 'winston-daily-rotate-file';
import { LogLevel } from './../model/logLevel';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';

@Service()
export class LoggingService {
    protected logger: Logger;
    protected defaultRotateOptions: DailyRotateFileTransportOptions = {
        filename: '%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
    };

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
                new winston.transports.DailyRotateFile({
                    dirname: `${config.logging.directory}/error`,
                    level: 'error',
                    ...this.defaultRotateOptions,
                }),
                new winston.transports.DailyRotateFile({
                    dirname: `${config.logging.directory}/warn`,
                    level: 'warn',
                    ...this.defaultRotateOptions,
                }),
                new winston.transports.DailyRotateFile({
                    dirname: `${config.logging.directory}/info`,
                    level: 'info',
                    ...this.defaultRotateOptions,
                }),
                new winston.transports.DailyRotateFile({
                    dirname: `${config.logging.directory}/http`,
                    level: 'http',
                    ...this.defaultRotateOptions,
                }),
                new winston.transports.DailyRotateFile({
                    dirname: `${config.logging.directory}/verbose`,
                    level: 'verbose',
                    ...this.defaultRotateOptions,
                }),
                new winston.transports.DailyRotateFile({
                    dirname: `${config.logging.directory}/debug`,
                    level: 'debug',
                    ...this.defaultRotateOptions,
                }),
                new winston.transports.DailyRotateFile({
                    dirname: `${config.logging.directory}/silly`,
                    level: 'silly',
                    ...this.defaultRotateOptions,
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
