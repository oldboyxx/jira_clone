import { Module } from '@nestjs/common';
import { IssueService } from './issue.service';
import { IssueController } from './issue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ Issue ])],
  controllers: [IssueController],
  providers: [IssueService]
})
export class IssueModule {}
