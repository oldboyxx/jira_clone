import React from 'react';
import PropTypes from 'prop-types';

import { IssueStatus, IssuePriority } from 'shared/constants/issues';
import {
  Lists,
  List,
  ListTitle,
  ListIssuesCount,
  Issues,
  Issue,
  IssueTitle,
  IssueBottom,
  IssueTypeIcon,
  IssuePriorityIcon,
  IssueAssignees,
  IssueAssigneeAvatar,
} from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  filteredIssues: PropTypes.array.isRequired,
};

const ProjectBoardLists = ({ project, filteredIssues }) => {
  const renderList = status => {
    const getListIssues = issues => issues.filter(issue => issue.status === status);
    const allListIssues = getListIssues(project.issues);
    const filteredListIssues = getListIssues(filteredIssues);

    const issuesCount =
      allListIssues.length !== filteredListIssues.length
        ? `${filteredListIssues.length} of ${allListIssues.length}`
        : allListIssues.length;

    return (
      <List key={status}>
        <ListTitle>
          {`${issueStatusCopy[status]} `}
          <ListIssuesCount>{issuesCount}</ListIssuesCount>
        </ListTitle>
        <Issues>{filteredListIssues.map(renderIssue)}</Issues>
      </List>
    );
  };

  const renderIssue = issue => {
    const getUserById = userId => project.users.find(user => user.id === userId);
    const assignees = issue.userIds.map(getUserById);
    return (
      <Issue key={issue.id}>
        <IssueTitle>{issue.title}</IssueTitle>
        <IssueBottom>
          <div>
            <IssueTypeIcon type={issue.type} color={issue.type} />
            <IssuePriorityIcon
              type={
                [IssuePriority.LOW || IssuePriority.LOWEST].includes(issue.priority)
                  ? 'arrow-down'
                  : 'arrow-up'
              }
              color={issue.priority}
            />
          </div>
          <IssueAssignees>
            {assignees.map(user => (
              <IssueAssigneeAvatar
                key={user.id}
                size={24}
                avatarUrl={user.avatarUrl}
                name={user.name}
              />
            ))}
          </IssueAssignees>
        </IssueBottom>
      </Issue>
    );
  };

  return <Lists>{Object.values(IssueStatus).map(renderList)}</Lists>;
};

const issueStatusCopy = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.SELECTED]: 'Selected for development',
  [IssueStatus.INPROGRESS]: 'In progress',
  [IssueStatus.DONE]: 'Done',
};

ProjectBoardLists.propTypes = propTypes;

export default ProjectBoardLists;
