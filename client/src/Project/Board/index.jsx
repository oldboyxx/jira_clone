import React from 'react';
import PropTypes from 'prop-types';

import useMergeState from 'shared/hooks/mergeState';
import { Breadcrumbs } from 'shared/components';

import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';

const propTypes = {
  project: PropTypes.object.isRequired,
  updateLocalProjectIssues: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectBoard = ({ project, updateLocalProjectIssues }) => {
  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <>
      <Breadcrumbs items={['Projects', project.name, 'Kanban Board']} />
      <Header />
      <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <Lists
        project={project}
        filters={filters}
        updateLocalProjectIssues={updateLocalProjectIssues}
      />
    </>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
