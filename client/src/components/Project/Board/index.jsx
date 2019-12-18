import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import { Modal } from 'shared/components';
import Header from './Header';
import Filters from './Filters';
import Lists from './Lists';
import IssueDetails from './IssueDetails';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  updateLocalIssuesArray: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchQuery: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectBoard = ({ project, fetchProject, updateLocalIssuesArray }) => {
  const match = useRouteMatch();
  const history = useHistory();
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
      <Route
        path={`${match.path}/:issueId`}
        render={({ match: { params } }) => (
          <Modal
            isOpen
            width={1040}
            withCloseIcon={false}
            onClose={() => history.push(match.url)}
            renderContent={modal => (
              <IssueDetails
                issueId={params.issueId}
                projectUsers={project.users}
                fetchProject={fetchProject}
                updateLocalIssuesArray={updateLocalIssuesArray}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />
    </>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
