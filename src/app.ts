import e, { Request, Response } from 'express';

const app = e();
const port = 8080;

app.get('/', (_: Request, res: Response) => {
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
