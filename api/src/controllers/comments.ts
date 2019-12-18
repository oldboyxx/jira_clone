import express from 'express';

import { Comment } from 'entities';
import { catchErrors } from 'errors';
import { updateEntity, deleteEntity, createEntity } from 'utils/typeorm';

const router = express.Router();

router.post(
  '/comments',
  catchErrors(async (req, res) => {
    const comment = await createEntity(Comment, req.body);
    res.respond({ comment });
  }),
);

router.put(
  '/comments/:commentId',
  catchErrors(async (req, res) => {
    const comment = await updateEntity(Comment, req.params.commentId, req.body);
    res.respond({ comment });
  }),
);

router.delete(
  '/comments/:commentId',
  catchErrors(async (req, res) => {
    const comment = await deleteEntity(Comment, req.params.commentId);
    res.respond({ comment });
  }),
);

export default router;
