import React from 'react';
import PropTypes from 'prop-types';

import useMergeState from 'shared/hooks/mergeState';

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
  const [filters, mergeFilters] = useMergeState(defaultFilters);
  return (
    <>
      <Header projectName={project.name} />
      <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <Lists project={project} filters={filters} updateLocalIssuesArray={updateLocalIssuesArray} />
    </>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
