import React from 'react';

import useApi from 'shared/hooks/api';
import { PageLoader, PageError } from 'shared/components';
import Sidebar from './Sidebar';
import Board from './Board';
import { ProjectPage } from './Styles';

const Project = () => {
  const [{ data, error, setLocalData: setLocalProjectData }] = useApi.get('/project');

  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { project } = data;

  return (
    <ProjectPage>
      <Sidebar projectName={project.name} />
      <Board project={project} setLocalProjectData={setLocalProjectData} />
    </ProjectPage>
  );
};

export default Project;
