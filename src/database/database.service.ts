import { Connection } from 'mongoose';
import mongoose from 'mongoose';
import config from '../config';

export class DatabaseService {
    public connection: Connection;

    constructor() {
        const databaseUrl = config.mongodb.connection ?? null;
        if (databaseUrl === null) {
            throw Error('No database connection defined. Please check .env file.');
        }

        this.connection = mongoose.createConnection(databaseUrl + config.mongodb.database, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
    }
}