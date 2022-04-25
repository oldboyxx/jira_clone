import { PartialType } from '@nestjs/mapped-types';
import { CreateIssueDto } from './create-issue.dto';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {}
