import express from 'express';

import { Project } from 'entities';
import { catchErrors } from 'errors';
import { findEntityOrThrow, updateEntity } from 'utils/typeorm';

const router = express.Router();

router.get(
  '/project',
  catchErrors(async (req, res) => {
    const project = await findEntityOrThrow(Project, req.currentUser.projectId, {
      relations: ['users', 'issues', 'issues.comments'],
    });
    res.respond({ project });
  }),
);

router.put(
  '/projects/:projectId',
  catchErrors(async (req, res) => {
    const project = await updateEntity(Project, req.params.projectId, req.body);
    res.respond({ project });
  }),
);

export default router;
