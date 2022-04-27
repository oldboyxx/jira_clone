import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const newComment = await this.commentRepository.create(createCommentDto);
    const savedComment = await this.commentRepository.save(newComment);
    return savedComment;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(id);
    const mergedComment = this.commentRepository.merge(comment, updateCommentDto);
    const savedComment = await this.commentRepository.save(mergedComment);

    return savedComment;
  }

  async remove(id: number) {
    const issue = await this.findOne(id);
    return this.commentRepository.remove(issue);
  }

  private async findOne(id: number) {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(Comment, 'Comment was not found');
    }

    return comment;
  }
}
