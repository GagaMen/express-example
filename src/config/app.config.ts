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
        user: process.env['MONGODB_USER'],
        password: process.env['MONGODB_PASSWORD'],
        database: process.env['MONGODB_DATABASE'] ?? 'express-example',
    },
    api: {
        prefix: '/api',
    },
    logging: {
        directory: process.env['LOGGING_DIRECTORY'] ?? 'logs',
        level: process.env['LOGGING_LEVEL'] ?? 'info',
        silent: process.env['LOGGING_SILENT'] === 'true',
    },
};
