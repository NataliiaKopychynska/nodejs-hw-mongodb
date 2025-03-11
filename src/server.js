import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import initMongoConnection from './db/initMongoConnection.js';
import pino from 'pino';
import routes from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
});

export async function setupServer() {
  const PORT = process.env.PORT || 9090;
  try {
    await initMongoConnection();
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(routes);
    app.use(errorHandler);
    app.use(notFoundHandler);
    app.use((req, res, next) => {
      logger.info(`Incoming request: ${req.method} ${req.url}`);
      next();
    });
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
