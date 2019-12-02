import { Comment, Issue, Project, User } from 'entities';
import { ProjectCategory } from 'constants/projects';
import { IssueType, IssueStatus, IssuePriority } from 'constants/issues';
import { createEntity } from 'utils/typeorm';

const seedProject = (user: User): Promise<Project> =>
  createEntity(Project, {
    name: 'Project: Hello World',
    url: 'https://www.atlassian.com/software/jira',
    description:
      'Plan, track, and manage your agile and software development projects in Jira. Customize your workflow, collaborate, and release great software.',
    category: ProjectCategory.SOFTWARE,
    users: [user],
  });

const seedIssues = (project: Project): Promise<Issue[]> => {
  const user = project.users[0];
  const issues = [
    createEntity(Issue, {
      title: 'This is an issue of type: Task.',
      type: IssueType.TASK,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.LOWEST,
      estimate: 8,
      reporterId: user.id,
      project,
      users: [user],
    }),
    createEntity(Issue, {
      title: "Click on an issue to see what's behind it.",
      type: IssueType.TASK,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.LOW,
      description: 'Nothing in particular.',
      estimate: 40,
      reporterId: user.id,
      project,
    }),
    createEntity(Issue, {
      title: 'Try dragging and sorting issues.',
      type: IssueType.BUG,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.MEDIUM,
      estimate: 15,
      reporterId: user.id,
      project,
      users: [user],
    }),
    createEntity(Issue, {
      title: 'You can use markdown for issue descriptions.',
      type: IssueType.STORY,
      status: IssueStatus.BACKLOG,
      priority: IssuePriority.HIGH,
      description:
        "#### Colons can be used to align columns.\n\n| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned |  |\n| col 2 is      | centered      |    |\n| zebra stripes | are neat      |     |\n\nThe outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.\n\nMarkdown | Less | Pretty\n--- | --- | ---\n*Still* | `renders` | **nicely**\n1 | 2 | 3",
      estimate: 4,
      reporterId: user.id,
      project,
      users: [user],
    }),
    createEntity(Issue, {
      title: 'You must assign priority from lowest to highest to all issues.',
      type: IssueType.TASK,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.HIGHEST,
      estimate: 15,
      reporterId: user.id,
      project,
    }),
    createEntity(Issue, {
      title: 'You can assign labels to issues.',
      type: IssueType.STORY,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.MEDIUM,
      estimate: 55,
      reporterId: user.id,
      project,
      users: [user],
    }),
    createEntity(Issue, {
      title: 'Try leaving a comment on this issue.',
      type: IssueType.TASK,
      status: IssueStatus.SELECTED,
      priority: IssuePriority.MEDIUM,
      estimate: 12,
      reporterId: user.id,
      project,
    }),
  ];
  return Promise.all(issues);
};

const seedComments = (issue: Issue): Promise<Comment> =>
  createEntity(Comment, {
    body: "Be nice to each other! Don't be mean to each other!",
    issue,
    user: issue.users[0],
  });

const seedGuestUserEntities = async (user: User): Promise<void> => {
  const project = await seedProject(user);
  const issues = await seedIssues(project);
  await seedComments(issues[issues.length - 1]);
};

export default seedGuestUserEntities;
