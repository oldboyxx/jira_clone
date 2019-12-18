import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import useApi from 'shared/hooks/api';
import { PageError } from 'shared/components';
import Loader from './Loader';
import TopActions from './TopActions';
import Title from './Title';
import Description from './Description';
import RightActions from './RightActions';
import { Content, Left, Right } from './Styles';

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
  const [{ data, error, isLoading, setLocalData }] = useApi.get(`/issues/${issueId}`);

  if (isLoading) return <Loader />;
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
      <TopActions
        issue={issue}
        updateIssue={updateIssue}
        fetchProject={fetchProject}
        modalClose={modalClose}
      />
      <Content>
        <Left>
          <Title issue={issue} updateIssue={updateIssue} />
          <Description issue={issue} updateIssue={updateIssue} />
        </Left>
        <Right>
          <RightActions issue={issue} updateIssue={updateIssue} projectUsers={projectUsers} />
        </Right>
      </Content>
    </>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;

export default ProjectBoardIssueDetails;
