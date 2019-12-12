import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { copyToClipboard } from 'shared/utils/clipboard';
import { Button } from 'shared/components';
import { Breadcrumbs, Divider, Header, BoardName } from './Styles';

const propTypes = {
  projectName: PropTypes.string.isRequired,
};

const ProjectBoardHeader = ({ projectName }) => {
  const [isLinkCopied, setLinkCopied] = useState(false);
  return (
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
        <Button
          icon="link"
          onClick={() => {
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
            copyToClipboard(window.location.href);
          }}
        >
          {isLinkCopied ? 'Link Copied' : 'Copy link'}
        </Button>
      </Header>
    </>
  );
};

ProjectBoardHeader.propTypes = propTypes;

export default ProjectBoardHeader;
