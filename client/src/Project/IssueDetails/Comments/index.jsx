import React from 'react';
import PropTypes from 'prop-types';

import { sortByNewest } from 'shared/utils/javascript';

import Create from './Create';
import Comment from './Comment';
import { Comments, Title } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsComments = ({ issue, fetchIssue }) => (
  <Comments>
    <Title>Comments</Title>
    <Create issueId={issue.id} fetchIssue={fetchIssue} />

    {sortByNewest(issue.comments, 'createdAt').map(comment => (
      <Comment key={comment.id} comment={comment} fetchIssue={fetchIssue} />
    ))}
  </Comments>
);

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
