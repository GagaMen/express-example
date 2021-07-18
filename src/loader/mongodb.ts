import { Db, MongoClient } from 'mongodb';
import config from './../config';

export default async (): Promise<Db> => {
    const databaseUrl = config.mongodb.connection ?? null;
    if (databaseUrl === null) {
        throw Error('No database connection defined. Please check .env file.');
    }

    const client = new MongoClient(databaseUrl);
    await client.connect();

    return client.db(config.mongodb.database);
};
