import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([ Project ])],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
