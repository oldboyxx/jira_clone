import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useApi from 'shared/hooks/api';
import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';

const propTypes = {
  project: PropTypes.object.isRequired,
};

const ProjectBoard = ({ project }) => {
  const [filteredIssues, setFilteredIssues] = useState([]);

  const [{ data }] = useApi.get('/currentUser');

  const { currentUser } = data || {};
  return (
    <>
      <Header projectName={project.name} />
      {currentUser && (
        <Filters project={project} currentUser={currentUser} onChange={setFilteredIssues} />
      )}
      <Lists project={project} filteredIssues={filteredIssues} />
    </>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
