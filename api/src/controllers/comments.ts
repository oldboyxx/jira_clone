import { AppDataSource } from '../database/data-source';
import { Comment } from '../entities';
import { catchErrors, EntityNotFoundError } from '../errors';
import { createEntity } from '../utils/typeorm';

export const create = catchErrors(async (req, res) => {
  const comment = await createEntity(Comment, req.body);
  res.respond({ comment });
});

export const update = catchErrors(async (req, res) => {
  const commentRepository = AppDataSource.getRepository(Comment);
  const comment = await commentRepository.findOneBy({
    id: (req.params.commentId as unknown) as number,
  });

  if (!comment) {
    throw new EntityNotFoundError('Comment');
  }

  const updatedComment = commentRepository.merge(comment, req.body);
  const savedComment = await commentRepository.save(updatedComment);

  res.respond({ comment: savedComment });
});

export const remove = catchErrors(async (req, res) => {
  const removeResult = await AppDataSource.manager.delete(Comment, req.params.commentId);
  res.respond({ deleted: removeResult.affected });
});
