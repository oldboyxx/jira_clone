import { Project } from '../entities';
import { catchErrors, EntityNotFoundError } from '../errors';
import { issuePartial } from '../serializers/issues';
import { AppDataSource } from '../database/data-source';

export const getProjectWithUsersAndIssues = catchErrors(async (req, res) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const project = await projectRepository.findOne({
    where: { id: req.currentUser.projectId },
    relations: ['users', 'issues'],
  });

  if (!project) {
    throw new EntityNotFoundError('Project');
  }
  res.respond({
    project: {
      ...project,
      issues: project.issues.map(issuePartial),
    },
  });
});

export const update = catchErrors(async (req, res) => {
  const projectRepository = AppDataSource.getRepository(Project);
  const project = await projectRepository.findOneBy({ id: req.currentUser.projectId });

  if (!project) {
    throw new EntityNotFoundError('Project');
  }

  const updatedProject = projectRepository.merge(project, req.body);
  const savedProject = await projectRepository.save(updatedProject);

  res.respond({ project: savedProject });
});
