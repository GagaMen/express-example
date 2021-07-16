import express, { Request, Response } from 'express';
import { Db, MongoClient } from 'mongodb';
import config from './config';

// init database
const databaseUrl = config.mongodb.connection ?? null;
if (databaseUrl === null) {
    throw Error('No database connection defined. Please check .env file.');
}

const client = new MongoClient(databaseUrl);

void client
    .connect()
    .then(() => {
        const db: Db = client.db(config.mongodb.database);
        void db.command({ ping: 1 });
        console.log('Connected successfully to database server');

        const testCollection = db.collection('testCollection');
        void testCollection
            .find({ a: 1 })
            .count()
            .then((count) => {
                if (count === 0) {
                    void testCollection.insertOne({ a: 1, b: 2, c: 3, d: 4, e: 5 });
                }
            });
    })
    .catch((err: string) => {
        console.error(err);
        void client.close();
    });

const app = express();

app.get('/', (_: Request, res: Response) => {
    res.send('Hello world!');
});

app.listen(config.server.port, () => {
    console.log(`server started at http://localhost:${port}`);
});
