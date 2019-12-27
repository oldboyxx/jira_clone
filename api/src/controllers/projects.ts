import express from 'express';

import { Project } from 'entities';
import { catchErrors } from 'errors';
import { findEntityOrThrow, updateEntity } from 'utils/typeorm';
import { issuePartial } from 'serializers/issues';

const router = express.Router();

router.get(
  '/project',
  catchErrors(async (req, res) => {
    const project = await findEntityOrThrow(Project, req.currentUser.projectId, {
      relations: ['users', 'issues'],
    });
    res.respond({
      project: {
        ...project,
        issues: project.issues.map(issuePartial),
      },
    });
  }),
);

router.put(
  '/project',
  catchErrors(async (req, res) => {
    const project = await updateEntity(Project, req.currentUser.projectId, req.body);
    res.respond({ project });
  }),
);

export default router;
