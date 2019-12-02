import faker from 'faker';
import { sample } from 'lodash';

import Project from 'entities/Project';
import { ProjectCategory } from 'constants/projects';

const generateProject = (data: Partial<Project> = {}): Partial<Project> => ({
  name: faker.company.companyName(),
  url: faker.internet.url(),
  description: faker.lorem.paragraph(),
  category: sample(Object.values(ProjectCategory)),
  ...data,
});

export default generateProject;
