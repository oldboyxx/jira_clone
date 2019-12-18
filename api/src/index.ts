import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import createDatabaseConnection from 'database/connection';
import { authenticateUser } from 'middleware/authentication';
import authenticationRoutes from 'controllers/authentication';
import commentsRoutes from 'controllers/comments';
import issuesRoutes from 'controllers/issues';
import projectsRoutes from 'controllers/projects';
import usersRoutes from 'controllers/users';
import { RouteNotFoundError } from 'errors';
import { errorHandler } from 'errors/errorHandler';

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await createDatabaseConnection();
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = (): void => {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use((_req, res, next) => {
    res.respond = (data): void => {
      res.status(200).send(data);
    };
    next();
  });

  app.use('/', authenticationRoutes);

  app.use('/', authenticateUser);

  app.use('/', commentsRoutes);
  app.use('/', issuesRoutes);
  app.use('/', projectsRoutes);
  app.use('/', usersRoutes);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
