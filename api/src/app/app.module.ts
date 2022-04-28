import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueModule } from 'src/issue/issue.module';
import { CommentsModule } from 'src/comments/comments.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { AuthModuleModule } from 'src/auth-module/auth-module.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IssueModule, CommentsModule, ProjectsModule, AuthModuleModule],
})
export class AppModule {}
