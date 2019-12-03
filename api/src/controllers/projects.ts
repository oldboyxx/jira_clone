import express from 'express';

import { Project } from 'entities';
import { catchErrors } from 'errors';
import { findEntityOrThrow, updateEntity, deleteEntity, createEntity } from 'utils/typeorm';

const router = express.Router();

router.get(
  '/projects',
  catchErrors(async (_req, res) => {
    const projects = await Project.find();
    res.respond({ projects });
  }),
);

router.get(
  '/projects/:projectId',
  catchErrors(async (req, res) => {
    const project = await findEntityOrThrow(Project, req.params.projectId, {
      relations: ['users', 'issues', 'issues.comments'],
    });
    res.respond({ project });
  }),
);

router.post(
  '/projects',
  catchErrors(async (req, res) => {
    const project = await createEntity(Project, req.body);
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

router.delete(
  '/projects/:projectId',
  catchErrors(async (req, res) => {
    const project = await deleteEntity(Project, req.params.projectId);
    res.respond({ project });
  }),
);

export default router;
