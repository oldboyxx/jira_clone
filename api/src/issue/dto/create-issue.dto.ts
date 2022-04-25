import { IssuePriority, IssueStatus, IssueType } from "src/constants/issues";

export class CreateIssueDto {
  title: string;
  type: IssueType;
  description: string | null;
  reporterId: number;
  priority: IssuePriority;
  status: IssueStatus;
  projectId: number;
}
