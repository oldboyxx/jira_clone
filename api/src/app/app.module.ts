import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueModule } from 'src/issue/issue.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IssueModule],
  controllers: [AppController]
})
export class AppModule {}
