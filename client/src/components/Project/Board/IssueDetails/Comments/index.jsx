import React from 'react';
import PropTypes from 'prop-types';

import Create from './Create';
import Comment from './Comment';
import { Comments, Title } from './Styles';

const propTypes = {
  issue: PropTypes.array.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsComments = ({ issue, fetchIssue }) => (
  <Comments>
    <Title>Comments</Title>
    <Create issueId={issue.id} fetchIssue={fetchIssue} />
    {sortByNewestFirst(issue.comments).map(comment => (
      <Comment key={comment.id} comment={comment} fetchIssue={fetchIssue} />
    ))}
  </Comments>
);

const sortByNewestFirst = items => items.sort((a, b) => -a.createdAt.localeCompare(b.createdAt));

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
