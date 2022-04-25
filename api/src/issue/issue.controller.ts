import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IssueService } from './issue.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';

@Controller('issues')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  // @Post()
  // create(@Body() createIssueDto: CreateIssueDto) {
  //   return this.issueService.create(createIssueDto);
  // }

  @Get()
  findAll() {
    return this.issueService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.issueService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
  //   return this.issueService.update(+id, updateIssueDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.issueService.remove(+id);
  // }
}
