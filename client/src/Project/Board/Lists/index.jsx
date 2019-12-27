import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { intersection } from 'lodash';

import api from 'shared/utils/api';
import useCurrentUser from 'shared/hooks/currentUser';
import { moveItemWithinArray, insertItemIntoArray } from 'shared/utils/javascript';
import { IssueStatus, IssueStatusCopy } from 'shared/constants/issues';

import Issue from './Issue';
import { Lists, List, Title, IssuesCount, Issues } from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const ProjectBoardLists = ({ project, filters, updateLocalProjectIssues }) => {
  const { currentUserId } = useCurrentUser();

  const handleIssueDrop = async ({ draggableId, destination, source }) => {
    if (!isPositionChanged(source, destination)) return;

    const issueId = Number(draggableId);

    api.optimisticUpdate(`/issues/${issueId}`, {
      updatedFields: {
        status: destination.droppableId,
        listPosition: calculateListPosition(project.issues, destination, source, issueId),
      },
      currentFields: project.issues.find(({ id }) => id === issueId),
      setLocalData: fields => updateLocalProjectIssues(issueId, fields),
    });
  };

  const renderList = status => {
    const filteredIssues = filterIssues(project.issues, filters, currentUserId);
    const filteredListIssues = getSortedListIssues(filteredIssues, status);
    const allListIssues = getSortedListIssues(project.issues, status);

    return (
      <Droppable key={status} droppableId={status}>
        {provided => (
          <List>
            <Title>
              {`${IssueStatusCopy[status]} `}
              <IssuesCount>{formatIssuesCount(allListIssues, filteredListIssues)}</IssuesCount>
            </Title>
            <Issues {...provided.droppableProps} ref={provided.innerRef}>
              {filteredListIssues.map((issue, index) => (
                <Issue key={issue.id} projectUsers={project.users} issue={issue} index={index} />
              ))}
              {provided.placeholder}
            </Issues>
          </List>
        )}
      </Droppable>
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={handleIssueDrop}>
        <Lists>{Object.values(IssueStatus).map(renderList)}</Lists>
      </DragDropContext>
    </>
  );
};

const filterIssues = (projectIssues, filters, currentUserId) => {
  const { searchTerm, userIds, myOnly, recent } = filters;
  let issues = projectIssues;

  if (searchTerm) {
    issues = issues.filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  if (userIds.length > 0) {
    issues = issues.filter(issue => intersection(issue.userIds, userIds).length > 0);
  }
  if (myOnly && currentUserId) {
    issues = issues.filter(issue => issue.userIds.includes(currentUserId));
  }
  if (recent) {
    issues = issues.filter(issue => moment(issue.updatedAt).isAfter(moment().subtract(3, 'days')));
  }
  return issues;
};

const getSortedListIssues = (issues, status) =>
  issues.filter(issue => issue.status === status).sort((a, b) => a.listPosition - b.listPosition);

const formatIssuesCount = (allListIssues, filteredListIssues) => {
  if (allListIssues.length !== filteredListIssues.length) {
    return `${filteredListIssues.length} of ${allListIssues.length}`;
  }
  return allListIssues.length;
};

const isPositionChanged = (destination, source) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const calculateListPosition = (...args) => {
  const { prevIssue, nextIssue } = getAfterDropPrevNextIssue(...args);
  let position;

  if (!prevIssue && !nextIssue) {
    position = 1;
  } else if (!prevIssue) {
    position = nextIssue.listPosition - 1;
  } else if (!nextIssue) {
    position = prevIssue.listPosition + 1;
  } else {
    position = prevIssue.listPosition + (nextIssue.listPosition - prevIssue.listPosition) / 2;
  }
  return position;
};

const getAfterDropPrevNextIssue = (allIssues, destination, source, droppedIssueId) => {
  const destinationIssues = getSortedListIssues(allIssues, destination.droppableId);
  const droppedIssue = allIssues.find(issue => issue.id === droppedIssueId);
  const isSameList = destination.droppableId === source.droppableId;

  const afterDropDestinationIssues = isSameList
    ? moveItemWithinArray(destinationIssues, droppedIssue, destination.index)
    : insertItemIntoArray(destinationIssues, droppedIssue, destination.index);

  return {
    prevIssue: afterDropDestinationIssues[destination.index - 1],
    nextIssue: afterDropDestinationIssues[destination.index + 1],
  };
};

ProjectBoardLists.propTypes = propTypes;

export default ProjectBoardLists;
