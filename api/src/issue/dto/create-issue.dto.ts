import { IssuePriority, IssueStatus, IssueType } from "src/constants/issues";

  // static validations = {
  //   title: [is.required(), is.maxLength(200)],
  //   type: [is.required(), is.oneOf(Object.values(IssueType))],
  //   status: [is.required(), is.oneOf(Object.values(IssueStatus))],
  //   priority: [is.required(), is.oneOf(Object.values(IssuePriority))],
  //   listPosition: is.required(),
  //   reporterId: is.required(),
  // };

export class CreateIssueDto {
  title: string;
  type: IssueType;
  description: string | null;
  reporterId: number;
  priority: IssuePriority;
  status: IssueStatus;
  projectId: number;
}
