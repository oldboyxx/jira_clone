import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/entities/issue.entity';
import { Repository } from 'typeorm';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Injectable()
export class IssueService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
  ) {}

  async create(createIssueDto: CreateIssueDto) {
    const issueInstance = await this.issueRepository.create(createIssueDto);
    issueInstance.listPosition = 1;
    const createdIssue = await this.issueRepository.save(issueInstance);
    return createdIssue;
  }

  async findAll() {
    return await this.issueRepository.find();
  }

  async findOne(id: number) {
    const issue = await this.issueRepository.findOne({ where: { id, }, relations: { comments: true }});
    if (!issue) {
      throw new NotFoundException(Issue, 'Issue was not found');
    }

    return issue;
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    const issue = await this.findOne(id);
    const mergedIssue = this.issueRepository.merge(issue, updateIssueDto);
    const savedIssue = await this.issueRepository.save(mergedIssue);

    return savedIssue;
  }

  async remove(id: number) {
    const issue = await this.findOne(id);
    return await this.issueRepository.remove(issue);
  }
}
