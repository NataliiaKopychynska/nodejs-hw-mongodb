import * as fs from 'node:fs';
import path from 'node:path';

import express from 'express';
import cookieParser from 'express';
import swaggerUIExpress from 'swagger-ui-express';
import cors from 'cors';
import 'dotenv/config';
import initMongoConnection from './db/initMongoConnection.js';
import pino from 'pino';
import ContactsRoutes from './routers/contacts.js';
import AuthRoutes from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
// import { auth } from './middlewares/auth.js';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
});

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve('docs', 'swagger.json'), 'utf-8'),
);

export async function setupServer() {
  const PORT = process.env.PORT || 9090;

  try {
    await initMongoConnection();

    const app = express();

    app.use(cookieParser());
    app.use(cors());
    app.use(express.json());

    app.use(
      '/api-docs',
      swaggerUIExpress.serve,
      swaggerUIExpress.setup(swaggerDocument),
    );

    app.use((req, res, next) => {
      logger.info(`Incoming request: ${req.method} ${req.url}`);
      next();
    });

    app.use(ContactsRoutes);
    app.use(AuthRoutes);

    app.use(errorHandler);
    app.use(notFoundHandler);

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
