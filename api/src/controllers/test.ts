import express from 'express';

import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import resetDatabase from 'database/resetDatabase';
import createTestAccount from 'database/createTestAccount';

const router = express.Router();

router.delete(
  '/test/reset-database',
  catchErrors(async (_req, res) => {
    await resetDatabase();
    res.respond(true);
  }),
);

router.post(
  '/test/create-account',
  catchErrors(async (_req, res) => {
    const user = await createTestAccount();
    res.respond({
      authToken: signToken({ sub: user.id }),
    });
  }),
);

export default router;
