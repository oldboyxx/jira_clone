import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/entities';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({ where: { id }, relations: { users: true, issues: true } });
    if (!project) {
      throw new NotFoundException(Project, 'Project was not found');
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    const mergedProject = this.projectRepository.merge(project, updateProjectDto);
    mergedProject.updatedAt = new Date();
    const savedProject = await this.projectRepository.save(mergedProject);
    
    return savedProject;
  }
}
