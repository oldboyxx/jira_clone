import express from 'express';

import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import createGuestAccount from 'database/createGuestAccount';

const router = express.Router();

router.post(
  '/authentication/guest',
  catchErrors(async (_req, res) => {
    const user = await createGuestAccount();
    res.respond({
      authToken: signToken({ sub: user.id }),
    });
  }),
);

export default router;
