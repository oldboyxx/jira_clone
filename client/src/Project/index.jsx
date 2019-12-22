import React from 'react';
import { Route, Redirect, useRouteMatch, useHistory } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { PageLoader, PageError, Modal } from 'shared/components';
import NavbarLeft from './NavbarLeft';
import Sidebar from './Sidebar';
import Board from './Board';
import IssueDetails from './IssueDetails';
import IssueCreateForm from './IssueCreateForm';
import { ProjectPage } from './Styles';

const Project = () => {
  const match = useRouteMatch();
  const history = useHistory();

  const [{ data, error, setLocalData }, fetchProject] = useApi.get('/project');

  const updateLocalIssuesArray = (issueId, updatedFields) => {
    setLocalData(currentData => ({
      project: {
        ...currentData.project,
        issues: updateArrayItemById(data.project.issues, issueId, updatedFields),
      },
    }));
  };

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { project } = data;

  const renderBoard = () => (
    <Board
      project={project}
      fetchProject={fetchProject}
      updateLocalIssuesArray={updateLocalIssuesArray}
    />
  );
  const renderIssueDetailsModal = routeProps => (
    <Modal
      isOpen
      width={1040}
      withCloseIcon={false}
      onClose={() => history.push(match.url)}
      renderContent={modal => (
        <IssueDetails
          issueId={routeProps.match.params.issueId}
          projectUsers={project.users}
          fetchProject={fetchProject}
          updateLocalIssuesArray={updateLocalIssuesArray}
          modalClose={modal.close}
        />
      )}
    />
  );
  const renderIssueCreateModal = () => (
    <Modal
      isOpen
      width={800}
      onClose={() => history.push(match.url)}
      renderContent={modal => (
        <IssueCreateForm project={project} fetchProject={fetchProject} modalClose={modal.close} />
      )}
    />
  );
  return (
    <ProjectPage>
      <NavbarLeft />
      <Sidebar projectName={project.name} matchPath={match.path} />
      <Route path={`${match.path}/board`} render={renderBoard} />
      <Route path={`${match.path}/board/create-issue`} render={renderIssueCreateModal} />
      <Route path={`${match.path}/board/issue/:issueId`} render={renderIssueDetailsModal} />
      {match.isExact && <Redirect to={`${match.url}/board`} />}
    </ProjectPage>
  );
};

export default Project;
