import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/entities/issue.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: Repository<Issue>,
  ) {}
  // create(createIssueDto: CreateIssueDto) {
  //   return 'This action adds a new issue';
  // }

  async findAll() {
    // const issue = await AppDataSource.manager.findOne(Issue, {
    //   where: { id: (req.params.issueId as unknown) as number },
    //   relations: ['users', 'comments', 'comments.user'],
    // });
    // if (!issue) {
    //   // throw new EntityNotFoundError('Issue');
    //   throw new Error('there was an error with Issue');
    // }
    
    // return issue;
    return await this.issueRepository.find();
  }

  async findOne(id: number) {
    const issue = await this.issueRepository.findOneBy({ id });
    if (!issue) {
      throw new NotFoundException(Issue, 'Issue was not found');
    }

    return issue;
  }

  // update(id: number, updateIssueDto: UpdateIssueDto) {
  //   return `This action updates a #${id} issue`;
  // }

  async remove(id: number) {
    const issue = await this.findOne(id);
    return await this.issueRepository.remove(issue);
  }
}
