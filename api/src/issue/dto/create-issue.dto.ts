import { Allow, IsArray, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/entities";
import { IssuePriority, IssueStatus, IssueType } from "src/issue/types";

export class CreateIssueDto {
  @IsString()
  title: string;

  @IsIn(Object.values(IssueType))
  type: IssueType;

  @IsOptional()
  @IsString()
  description: string | null;

  @IsNumber()
  reporterId: number;

  @IsIn(Object.values(IssuePriority))
  priority: IssuePriority;

  @IsIn(Object.values(IssueStatus))
  status: IssueStatus;

  @IsNumber()
  projectId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];

  @Allow()
  users?: User[];
}
