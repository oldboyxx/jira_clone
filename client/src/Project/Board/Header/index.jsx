import React from 'react';

import { CopyLinkButton } from 'shared/components';

import { Header, BoardName } from './Styles';

const ProjectBoardHeader = () => (
  <Header>
    <BoardName>Kanban board</BoardName>
    <CopyLinkButton />
  </Header>
);

export default ProjectBoardHeader;
