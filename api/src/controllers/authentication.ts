import express from 'express';

import { catchErrors } from 'errors';
import { signToken } from 'utils/authToken';
import seedGuestUserEntities from 'database/seeds/guestUser';

const router = express.Router();

router.post(
  '/authentication/guest',
  catchErrors(async (_req, res) => {
    const user = await seedGuestUserEntities();
    res.respond({
      authToken: signToken({ sub: user.id }),
    });
  }),
);

export default router;
