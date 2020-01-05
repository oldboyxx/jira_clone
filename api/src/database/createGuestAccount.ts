import { Comment, Issue, Project, User } from 'entities';
import { ProjectCategory } from 'constants/projects';
import { IssueType, IssueStatus, IssuePriority } from 'constants/issues';
import { createEntity } from 'utils/typeorm';

const seedUsers = (): Promise<User[]> => {
  const users = [
    createEntity(User, {
      email: 'gaben@jira.guest',
      name: 'Lord Gaben',
      avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
    }),
    createEntity(User, {
      email: 'yoda@jira.guest',
      name: 'Baby Yoda',
      avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
    }),
    createEntity(User, {
      email: 'rick@jira.guest',
      name: 'Pickle Rick',
      avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
    }),
  ];
  return Promise.all(users);
};

const seedProject = (users: User[]): Promise<Project> =>
  createEntity(Project, {
    name: 'singularity 1.0',
    url: 'https://www.atlassian.com/software/jira',
    description:
      'Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.',
    category: ProjectCategory.SOFTWARE,
    users,
  });

const seedIssues = (project: Project): Promise<Issue[]> => {
  const { users } = project;

  const issues = [
    createEntity(Issue, {
      title: 'This is an issue of type: Task.',
      type: IssueType.TASK,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.LOWEST,
      listPosition: 1,
      estimate: 8,
      reporterId: users[1].id,
      project,
      users: [users[0]],
    }),
    createEntity(Issue, {
      title: "Click on an issue to see what's behind it.",
      type: IssueType.TASK,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.LOW,
      listPosition: 2,
      description: 'Nothing in particular.',
      estimate: 40,
      reporterId: users[2].id,
      project,
    }),
    createEntity(Issue, {
      title: 'Try dragging and sorting issues.',
      type: IssueType.BUG,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.MEDIUM,
      listPosition: 3,
      estimate: 15,
      reporterId: users[1].id,
      project,
      users: [users[2]],
    }),
    createEntity(Issue, {
      title: 'You can use markdown for issue descriptions.',
      type: IssueType.STORY,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.HIGH,
      listPosition: 4,
      description: '#### Colons can be used to align columns.',
      estimate: 4,
      reporterId: users[0].id,
      project,
      users: [users[2]],
    }),
    createEntity(Issue, {
      title: 'You must assign priority from lowest to highest to all issues.',
      type: IssueType.TASK,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.HIGHEST,
      listPosition: 5,
      estimate: 15,
      reporterId: users[2].id,
      project,
    }),
    createEntity(Issue, {
      title: 'You can assign labels to issues.',
      type: IssueType.STORY,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.MEDIUM,
      listPosition: 6,
      estimate: 55,
      reporterId: users[1].id,
      project,
      users: [users[0]],
    }),
    createEntity(Issue, {
      title: 'Try leaving a comment on this issue.',
      type: IssueType.TASK,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.MEDIUM,
      listPosition: 7,
      estimate: 12,
      reporterId: users[0].id,
      project,
    }),
  ];
  return Promise.all(issues);
};

const seedComments = (issue: Issue, user: User): Promise<Comment> =>
  createEntity(Comment, {
    body: "Be nice to each other! Don't be mean to each other!",
    issueId: issue.id,
    userId: user.id,
  });

const createGuestAccount = async (): Promise<User> => {
  const users = await seedUsers();
  const project = await seedProject(users);
  const issues = await seedIssues(project);
  await seedComments(issues[0], project.users[0]);
  return users[0];
};

export default createGuestAccount;
