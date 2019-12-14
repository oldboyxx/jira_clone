import 'module-alias/register';
import 'reflect-metadata';
import 'dotenv/config';
import { times, sample } from 'lodash';

import { Comment, Issue, Project, User } from 'entities';
import createDatabaseConnection from 'database/connection';
import { createEntity } from 'utils/typeorm';
import generateUser from './user';
import generateProject from './project';
import generateIssue from './issue';
import generateComment from './comment';

const seedUsers = (): Promise<User[]> => {
  const users = times(4, () => createEntity(User, generateUser()));
  return Promise.all(users);
};

const seedProjects = (users: User[]): Promise<Project[]> => {
  const projects = times(2, () => createEntity(Project, generateProject({ users })));
  return Promise.all(projects);
};

const seedIssues = (projects: Project[]): Promise<Issue[]> => {
  const issues = projects
    .map(project =>
      times(10, i =>
        createEntity(
          Issue,
          generateIssue({
            listPosition: i + 1,
            reporterId: (sample(project.users) as User).id,
            project,
            users: [sample(project.users) as User],
          }),
        ),
      ),
    )
    .flat();
  return Promise.all(issues);
};

const seedComments = (issues: Issue[]): Promise<Comment[]> => {
  const comments = issues.map(issue =>
    createEntity(Comment, generateComment({ issue, user: sample(issue.project.users) })),
  );
  return Promise.all(comments);
};

const seedEntities = async (): Promise<void> => {
  const users = await seedUsers();
  const projects = await seedProjects(users);
  const issues = await seedIssues(projects);
  await seedComments(issues);
};

const initializeSeed = async (): Promise<void> => {
  try {
    const Connection = await createDatabaseConnection();
    await Connection.dropDatabase();
    await Connection.synchronize();
    await seedEntities();
    console.log('Seeding completed!');
  } catch (error) {
    console.log(error);
  }
};

initializeSeed();
