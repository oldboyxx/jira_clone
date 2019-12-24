import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import useApi from 'shared/hooks/api';
import { PageError, CopyLinkButton, Button } from 'shared/components';

import Loader from './Loader';
import Type from './Type';
import Feedback from './Feedback';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import Comments from './Comments';
import Status from './Status';
import Users from './Users';
import Priority from './Priority';
import Tracking from './Tracking';
import Dates from './Dates';
import { TopActions, TopActionsRight, Content, Left, Right } from './Styles';

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalIssuesArray: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetails = ({
  issueId,
  projectUsers,
  fetchProject,
  updateLocalIssuesArray,
  modalClose,
}) => {
  const [{ data, error, setLocalData }, fetchIssue] = useApi.get(`/issues/${issueId}`);

  if (!data) return <Loader />;
  if (error) return <PageError />;

  const { issue } = data;

  const updateLocalIssue = fields =>
    setLocalData(currentData => ({ issue: { ...currentData.issue, ...fields } }));

  const updateIssue = updatedFields => {
    api.optimisticUpdate({
      url: `/issues/${issueId}`,
      updatedFields,
      currentFields: issue,
      setLocalData: fields => {
        updateLocalIssue(fields);
        updateLocalIssuesArray(issue.id, fields);
      },
    });
  };

  return (
    <>
      <TopActions>
        <Type issue={issue} updateIssue={updateIssue} />
        <TopActionsRight>
          <Feedback />
          <CopyLinkButton variant="empty" />
          <Delete issue={issue} fetchProject={fetchProject} modalClose={modalClose} />
          <Button icon="close" iconSize={24} variant="empty" onClick={modalClose} />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <Title issue={issue} updateIssue={updateIssue} />
          <Description issue={issue} updateIssue={updateIssue} />
          <Comments issue={issue} fetchIssue={fetchIssue} />
        </Left>
        <Right>
          <Status issue={issue} updateIssue={updateIssue} />
          <Users issue={issue} updateIssue={updateIssue} projectUsers={projectUsers} />
          <Priority issue={issue} updateIssue={updateIssue} />
          <Tracking issue={issue} updateIssue={updateIssue} />
          <Dates issue={issue} />
        </Right>
      </Content>
    </>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;

export default ProjectBoardIssueDetails;
