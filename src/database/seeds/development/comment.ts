import faker from 'faker';

import Comment from 'entities/Comment';

const generateComment = (data: Partial<Comment> = {}): Partial<Comment> => ({
  body: faker.lorem.paragraph(),
  ...data,
});

export default generateComment;
