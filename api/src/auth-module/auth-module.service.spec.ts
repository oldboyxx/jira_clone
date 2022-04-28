import { Test, TestingModule } from '@nestjs/testing';
import { AuthModuleService } from './auth-module.service';

describe('AuthModuleService', () => {
  let service: AuthModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthModuleService],
    }).compile();

    service = module.get<AuthModuleService>(AuthModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
