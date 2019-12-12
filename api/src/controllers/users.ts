import express from 'express';

import { catchErrors } from 'errors';

const router = express.Router();

router.get(
  '/currentUser',
  catchErrors((req, res) => {
    res.respond({ currentUser: req.currentUser });
  }),
);

export default router;
