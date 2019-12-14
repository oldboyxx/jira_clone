import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import { IssuePriority } from 'shared/constants/issues';
import {
  IssueWrapper,
  Issue,
  Title,
  Bottom,
  TypeIcon,
  PriorityIcon,
  Assignees,
  AssigneeAvatar,
} from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

const ProjectBoardListsIssue = ({ projectUsers, issue, index }) => {
  const getUserById = userId => projectUsers.find(user => user.id === userId);

  const assignees = issue.userIds.map(getUserById);

  const priorityIconType = [IssuePriority.LOW || IssuePriority.LOWEST].includes(issue.priority)
    ? 'arrow-down'
    : 'arrow-up';

  return (
    <Draggable draggableId={issue.id.toString()} index={index}>
      {(provided, snapshot) => (
        <IssueWrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Issue isBeingDragged={snapshot.isDragging && !snapshot.isDropAnimating}>
            <Title>{issue.title}</Title>
            <Bottom>
              <div>
                <TypeIcon type={issue.type} color={issue.type} />
                <PriorityIcon type={priorityIconType} color={issue.priority} />
              </div>
              <Assignees>
                {assignees.map(user => (
                  <AssigneeAvatar
                    key={user.id}
                    size={24}
                    avatarUrl={user.avatarUrl}
                    name={user.name}
                  />
                ))}
              </Assignees>
            </Bottom>
          </Issue>
        </IssueWrapper>
      )}
    </Draggable>
  );
};

ProjectBoardListsIssue.propTypes = propTypes;

export default ProjectBoardListsIssue;
