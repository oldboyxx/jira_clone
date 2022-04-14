import { AppDataSource } from 'database/data-source';
import { Issue } from 'entities';
import { catchErrors, EntityNotFoundError } from 'errors';
import { createEntity } from 'utils/typeorm';

export const getProjectIssues = catchErrors(async (req, res) => {
  const { projectId } = req.currentUser;
  const { searchTerm } = req.query;

  let whereSQL = 'issue.projectId = :projectId';

  if (searchTerm) {
    whereSQL += ' AND (issue.title ILIKE :searchTerm OR issue.descriptionText ILIKE :searchTerm)';
  }

  const issues = await Issue.createQueryBuilder('issue')
    .select()
    .where(whereSQL, { projectId, searchTerm: `%${searchTerm}%` })
    .getMany();

  res.respond({ issues });
});

export const getIssueWithUsersAndComments = catchErrors(async (req, res) => {
  const issue = await AppDataSource.manager.findOne(Issue, {
    where: { id: (req.params.issueId as unknown) as number },
    relations: ['users', 'comments', 'comments.user'],
  });
  if (!issue) {
    throw new EntityNotFoundError('Issue');
  }
  res.respond({ issue });
});

export const create = catchErrors(async (req, res) => {
  const listPosition = await calculateListPosition(req.body);
  const issue = await createEntity(Issue, { ...req.body, listPosition });
  res.respond({ issue });
});

export const update = catchErrors(async (req, res) => {
  const issueRepository = AppDataSource.getRepository(Issue);
  const issue = await issueRepository.findOneBy({ id: (req.params.issueId as unknown) as number });

  if (!issue) {
    throw new EntityNotFoundError('Issue');
  }

  const updatedIssue = issueRepository.merge(issue, req.body);
  const savedIssue = await issueRepository.save(updatedIssue);

  res.respond({ issue: savedIssue });
});

export const remove = catchErrors(async (req, res) => {
  const issueRepository = AppDataSource.getRepository(Issue);
  // TODO: probably find can be removed
  const issue = await issueRepository.findOneBy({
    id: (req.params.issueId as unknown) as number,
  });
  if (!issue) {
    throw new EntityNotFoundError('Issue');
  }
  await AppDataSource.manager.remove(issue);

  res.respond({ issue });
});

const calculateListPosition = async ({ projectId, status }: Issue): Promise<number> => {
  const issueRepository = AppDataSource.getRepository(Issue);
  const issues = await issueRepository.findBy({ projectId, status });

  const listPositions = issues.map(({ listPosition }) => listPosition);

  if (listPositions.length > 0) {
    return Math.min(...listPositions) - 1;
  }
  return 1;
};
