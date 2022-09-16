/* eslint-disable max-classes-per-file */

type ErrorData = { [key: string]: any };

export class CustomError extends Error {
  constructor(
    public message: string,
    public code: string | number = 'INTERNAL_ERROR',
    public status: number = 500,
    public data: ErrorData = {},
  ) {
    super();
  }
}

export class BadUserInputError extends CustomError {
  constructor(errorData: ErrorData) {
    super('There were invalid errors.', 'BAD_USER_INPUT', 400, errorData);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message = 'Authentication token is invalid.') {
    super(message, 'INVALID_TOKEN', 401);
  }
}
