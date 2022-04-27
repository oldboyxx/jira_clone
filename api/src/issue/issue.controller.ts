import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Controller('issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) createIssueDto: CreateIssueDto
  ) {
    return this.issueService.create(createIssueDto);
  }

  @Get()
  findAll() {
    return this.issueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) updateIssueDto: UpdateIssueDto
  ) {
    return this.issueService.update(id, updateIssueDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.issueService.remove(id);
  }
}
