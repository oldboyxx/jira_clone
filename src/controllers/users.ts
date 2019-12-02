import express from 'express';

import { User } from 'entities';
import { catchErrors } from 'errors';
import { createEntity } from 'utils/typeorm';
import { signToken } from 'utils/authToken';
import seedGuestUserEntities from 'database/seeds/guestUser';

const router = express.Router();

router.post(
  '/users/guest',
  catchErrors(async (req, res) => {
    const user = await createEntity(User, req.body);
    await seedGuestUserEntities(user);
    res.respond({
      authToken: signToken({ sub: user.id }),
    });
  }),
);

export default router;
