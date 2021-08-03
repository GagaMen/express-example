import Container, { Constructable } from 'typedi';
import { LoggingService } from '../service/logging';

export function InjectLogger() {
    return function (object: Constructable<unknown>, propertyName: string, index?: number): void {
        const logger = new LoggingService();
        Container.registerHandler({
            object,
            propertyName,
            index,
            value: () => logger,
        });
    };
}
