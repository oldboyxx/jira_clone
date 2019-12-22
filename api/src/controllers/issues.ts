import express from 'express';

import { Issue } from 'entities';
import { catchErrors } from 'errors';
import { updateEntity, deleteEntity, createEntity, findEntityOrThrow } from 'utils/typeorm';

const router = express.Router();

router.get(
  '/issues/:issueId',
  catchErrors(async (req, res) => {
    const issue = await findEntityOrThrow(Issue, req.params.issueId, {
      relations: ['users', 'comments', 'comments.user'],
    });
    res.respond({ issue });
  }),
);

router.post(
  '/issues',
  catchErrors(async (req, res) => {
    const listPosition = await calculateListPosition(req.body);
    const issue = await createEntity(Issue, { ...req.body, listPosition });
    res.respond({ issue });
  }),
);

router.put(
  '/issues/:issueId',
  catchErrors(async (req, res) => {
    const issue = await updateEntity(Issue, req.params.issueId, req.body);
    res.respond({ issue });
  }),
);

router.delete(
  '/issues/:issueId',
  catchErrors(async (req, res) => {
    const issue = await deleteEntity(Issue, req.params.issueId);
    res.respond({ issue });
  }),
);

const calculateListPosition = async (newIssue: Issue): Promise<number> => {
  const issues = await Issue.find({
    where: { projectId: newIssue.projectId, status: newIssue.status },
  });
  const listPositions = issues.map(({ listPosition }) => listPosition);
  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};

export default router;
