import { ErrorRequestHandler } from 'express';
import { pick } from 'lodash';

import { CustomError } from 'errors';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);

  const isErrorSafeForClient = error instanceof CustomError;

  const errorData = isErrorSafeForClient
    ? pick(error, ['message', 'code', 'status', 'data'])
    : {
        message: 'Something went wrong, please contact our support.',
        code: 'INTERNAL_ERROR',
        status: 500,
        data: {},
      };

  res.status(errorData.status).send({ errors: [errorData] });
};
