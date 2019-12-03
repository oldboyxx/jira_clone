import faker from 'faker';

import User from 'entities/User';

const generateUser = (data: Partial<User> = {}): Partial<User> => ({
  name: faker.company.companyName(),
  email: faker.internet.email(),
  ...data,
});

export default generateUser;
