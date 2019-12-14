import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import useApi from 'shared/hooks/api';
import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';

const propTypes = {
  project: PropTypes.object.isRequired,
  setLocalProjectData: PropTypes.func.isRequired,
};

const defaultFilters = { searchQuery: '', userIds: [], myOnly: false, recent: false };

const ProjectBoard = ({ project, setLocalProjectData }) => {
  const [filters, setFilters] = useState(defaultFilters);

  const [{ data }] = useApi.get('/currentUser');

  return (
    <>
      <Header projectName={project.name} />
      <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        setFilters={setFilters}
      />
      <Lists
        project={project}
        filters={filters}
        currentUserId={get(data, 'currentUser.id')}
        setLocalProjectData={setLocalProjectData}
      />
    </>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
