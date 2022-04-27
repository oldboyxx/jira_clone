import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { IssuePriority, IssueStatus } from 'src/issue/types';

export class UpdateIssueDto {
  @IsOptional()
  @IsString()
  title: string;
  
  @IsOptional()
  @IsString()
  description: string | null;
  
  @IsOptional()
  @IsNumber()
  reporterId: number;
  
  @IsOptional()
  @IsIn(Object.values(IssuePriority))
  priority: IssuePriority;
  
  @IsOptional()
  @IsIn(Object.values(IssueStatus))
  status: IssueStatus;
  
  @IsOptional()
  @IsNumber()
  projectId: number;
}
