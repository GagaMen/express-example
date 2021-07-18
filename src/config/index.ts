import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env['NODE_ENV'] = process.env['NODE_ENV'] || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    throw Error("Couldn't find .env file");
}

export default {
    server: {
        port: process.env['SERVER_PORT'] ?? 8080,
    },
    mongodb: {
        connection: process.env['MONGODB_CONNECTION'],
        database: process.env['MONGODB_DATABASE'],
    },
    api: {
        prefix: '/api',
    },
};
