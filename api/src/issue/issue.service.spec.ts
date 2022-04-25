import { Test, TestingModule } from '@nestjs/testing';
import { IssueService } from './issue.service';

describe('IssueService', () => {
  let service: IssueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssueService],
    }).compile();

    service = module.get<IssueService>(IssueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
