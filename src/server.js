import express from 'express';
import cookieParser from 'cookie-parser';
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

export async function setupServer() {
  const PORT = process.env.PORT || 9090;

  try {
    await initMongoConnection();

    const app = express();

    app.use(cookieParser());
    app.use(cors());
    app.use(express.json());

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
