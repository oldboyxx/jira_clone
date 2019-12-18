import React from 'react';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';

import useApi from 'shared/hooks/api';
import { updateArrayItemById } from 'shared/utils/javascript';
import { PageLoader, PageError } from 'shared/components';
import Sidebar from './Sidebar';
import Board from './Board';
import { ProjectPage } from './Styles';

const Project = () => {
  const match = useRouteMatch();
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
  const renderSettings = () => <h1>SETTINGS</h1>;
  const renderIssues = () => <h1>ISSUES</h1>;

  return (
    <ProjectPage>
      <Sidebar projectName={project.name} matchPath={match.path} />
      <Route path={`${match.path}/board`} render={renderBoard} />
      <Route path={`${match.path}/settings`} render={renderSettings} />
      <Route path={`${match.path}/issues`} render={renderIssues} />
      {match.isExact && <Redirect to={`${match.url}/board`} />}
    </ProjectPage>
  );
};

export default Project;
