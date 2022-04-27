import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueModule } from 'src/issue/issue.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IssueModule, CommentsModule],
  controllers: [AppController]
})
export class AppModule {}
