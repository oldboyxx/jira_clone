import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueModule } from 'src/issue/issue.module';
import { CommentsModule } from 'src/comments/comments.module';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IssueModule, CommentsModule, ProjectsModule],
})
export class AppModule {}
