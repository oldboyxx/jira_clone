import React from 'react';
import PropTypes from 'prop-types';

import { Icon, ProjectAvatar } from 'shared/components';
import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  Divider,
  LinkItem,
  LinkText,
  NotImplemented,
} from './Styles';

const propTypes = {
  projectName: PropTypes.string.isRequired,
  matchPath: PropTypes.string.isRequired,
};

const ProjectSidebar = ({ projectName, matchPath }) => {
  const renderLinkItem = (text, iconType, path = '') => (
    <LinkItem exact to={`${matchPath}${path}`} implemented={path}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!path && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
  return (
    <Sidebar>
      <ProjectInfo>
        <ProjectAvatar />
        <ProjectTexts>
          <ProjectName>{projectName}</ProjectName>
          <ProjectCategory>Software project</ProjectCategory>
        </ProjectTexts>
      </ProjectInfo>
      {renderLinkItem('Kanban Board', 'board', '/board')}
      {renderLinkItem('Reports', 'reports')}
      <Divider />
      {renderLinkItem('Releases', 'shipping')}
      {renderLinkItem('Issues and filters', 'issues')}
      {renderLinkItem('Pages', 'page')}
      {renderLinkItem('Components', 'component')}
      {renderLinkItem('Project settings', 'settings')}
    </Sidebar>
  );
};

ProjectSidebar.propTypes = propTypes;

export default ProjectSidebar;
