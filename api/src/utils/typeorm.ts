import { Project, User, Issue, Comment } from 'entities';
import { BadUserInputError } from 'errors';
import { generateErrors } from 'utils/validation';

type EntityConstructor = typeof Project | typeof User | typeof Issue | typeof Comment;
type EntityInstance = Project | User | Issue | Comment;

const entities: { [key: string]: EntityConstructor } = { Comment, Issue, Project, User };

export const validateAndSaveEntity = async <T extends EntityInstance>(instance: T): Promise<T> => {
  const Constructor = entities[instance.constructor.name];

  if ('validations' in Constructor) {
    const errorFields = generateErrors(instance, Constructor.validations);

    if (Object.keys(errorFields).length > 0) {
      throw new BadUserInputError({ fields: errorFields });
    }
  }
  return instance.save() as Promise<T>;
};

export const createEntity = async <T extends EntityConstructor>(
  Constructor: T,
  input: Partial<InstanceType<T>>,
): Promise<InstanceType<T>> => {
  const instance = Constructor.create(input);
  return validateAndSaveEntity(instance as InstanceType<T>);
};
