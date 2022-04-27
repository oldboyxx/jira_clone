import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueModule } from 'src/issue/issue.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IssueModule, CommentsModule],
})
export class AppModule {}
