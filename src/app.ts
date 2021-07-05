import dotenv from 'dotenv';
import e, { Request, Response } from 'express';

// load environment variables
dotenv.config();

const app = e();
const port = process.env['SERVER_PORT'] ?? 8080;

app.get('/', (_: Request, res: Response) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
