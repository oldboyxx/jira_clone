import React from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { createQueryParamModalHelpers } from 'shared/utils/queryParamModal';
import { PageLoader, PageError, Modal } from 'shared/components';

import NavbarLeft from './NavbarLeft';
import Sidebar from './Sidebar';
import Board from './Board';
import IssueSearch from './IssueSearch';
import IssueCreateForm from './IssueCreateForm';
import IssueDetails from './IssueDetails';
import ProjectSettings from './ProjectSettings';
import { ProjectPage } from './Styles';

const Project = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const issueSearchModalHelpers = createQueryParamModalHelpers('issue-search');
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');

  const [{ data, error, setLocalData }, fetchProject] = useApi.get('/project');

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { project } = data;

  const updateLocalProjectIssues = (issueId, updatedFields) => {
    setLocalData(currentData => ({
      project: {
        ...currentData.project,
        issues: updateArrayItemById(currentData.project.issues, issueId, updatedFields),
      },
    }));
  };

  const renderIssueSearchModal = () => (
    <Modal
      isOpen
      variant="aside"
      width={600}
      onClose={issueSearchModalHelpers.close}
      renderContent={() => <IssueSearch project={project} />}
    />
  );

  const renderIssueCreateModal = () => (
    <Modal
      isOpen
      width={800}
      withCloseIcon={false}
      onClose={issueCreateModalHelpers.close}
      renderContent={modal => (
        <IssueCreateForm
          project={project}
          fetchProject={fetchProject}
          onCreate={() => history.push(`${match.url}/board`)}
          modalClose={modal.close}
        />
      )}
    />
  );

  const renderBoard = () => (
    <Board
      project={project}
      fetchProject={fetchProject}
      updateLocalProjectIssues={updateLocalProjectIssues}
    />
  );

  const renderIssueDetailsModal = routeProps => (
    <Modal
      isOpen
      width={1040}
      withCloseIcon={false}
      onClose={() => history.push(`${match.url}/board`)}
      renderContent={modal => (
        <IssueDetails
          issueId={routeProps.match.params.issueId}
          projectUsers={project.users}
          fetchProject={fetchProject}
          updateLocalProjectIssues={updateLocalProjectIssues}
          modalClose={modal.close}
        />
      )}
    />
  );

  const renderProjectSettings = () => (
    <ProjectSettings project={project} fetchProject={fetchProject} />
  );

  return (
    <ProjectPage>
      <NavbarLeft
        issueSearchModalOpen={issueSearchModalHelpers.open}
        issueCreateModalOpen={issueCreateModalHelpers.open}
      />
      <Sidebar project={project} />

      {issueSearchModalHelpers.isOpen() && renderIssueSearchModal()}
      {issueCreateModalHelpers.isOpen() && renderIssueCreateModal()}

      <Route path={`${match.path}/board`} render={renderBoard} />
      <Route path={`${match.path}/board/issues/:issueId`} render={renderIssueDetailsModal} />
      <Route path={`${match.path}/settings`} render={renderProjectSettings} />
      {match.isExact && <Redirect to={`${match.url}/board`} />}
    </ProjectPage>
  );
};

export default Project;
