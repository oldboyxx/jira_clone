import React from 'react';
import PropTypes from 'prop-types';

import { CopyLinkButton } from 'shared/components';

import { Breadcrumbs, Divider, Header, BoardName } from './Styles';

const propTypes = {
  projectName: PropTypes.string.isRequired,
};

const ProjectBoardHeader = ({ projectName }) => (
  <>
    <Breadcrumbs>
      Projects
      <Divider>/</Divider>
      {projectName}
      <Divider>/</Divider>
      Kanban Board
    </Breadcrumbs>

    <Header>
      <BoardName>Kanban board</BoardName>
      <CopyLinkButton />
    </Header>
  </>
);

ProjectBoardHeader.propTypes = propTypes;

export default ProjectBoardHeader;
