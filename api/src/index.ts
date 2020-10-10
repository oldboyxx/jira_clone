import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import createDatabaseConnection from 'database/createConnection';
import { addRespondToResponse } from 'middleware/response';
import { authenticateUser } from 'middleware/authentication';
import { handleError } from 'middleware/errors';
import { RouteNotFoundError } from 'errors';

import { attachPublicRoutes, attachPrivateRoutes } from './routes';

const establishDatabaseConnection = async (): Promise<void> => {
  // 30 connection retries
  const sleep = (s: number) => new Promise((resolve) => setTimeout(resolve,s*1000));
  for (let i = 0; i < 30; i++) {
    try {
      await createDatabaseConnection();
      break
    } catch (error) {
      console.log(error);
    }
    await sleep(1);
  }
};

const initializeExpress = (): void => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(addRespondToResponse);

  attachPublicRoutes(app);

  app.use('/', authenticateUser);

  attachPrivateRoutes(app);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleError);

  app.listen(process.env.PORT || 3000);
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
