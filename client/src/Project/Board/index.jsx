import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';

const propTypes = {
  project: PropTypes.object.isRequired,
  updateLocalIssuesArray: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchQuery: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectBoard = ({ project, updateLocalIssuesArray }) => {
  const [filters, setFilters] = useState(defaultFilters);
  return (
    <>
      <Header projectName={project.name} />
      <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        setFilters={setFilters}
      />
      <Lists project={project} filters={filters} updateLocalIssuesArray={updateLocalIssuesArray} />
    </>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
