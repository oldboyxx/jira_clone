import React from 'react';
import PropTypes from 'prop-types';

import { Icon, ProjectAvatar } from 'shared/components';
import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  LinkItem,
  LinkText,
} from './Styles';

const propTypes = {
  projectName: PropTypes.string.isRequired,
  matchPath: PropTypes.string.isRequired,
};

const ProjectSidebar = ({ projectName, matchPath }) => (
  <Sidebar>
    <ProjectInfo>
      <ProjectAvatar />
      <ProjectTexts>
        <ProjectName>{projectName}</ProjectName>
        <ProjectCategory>Software project</ProjectCategory>
      </ProjectTexts>
    </ProjectInfo>
    <LinkItem to={`${matchPath}/board`}>
      <Icon type="board" />
      <LinkText>Kanban Board</LinkText>
    </LinkItem>
    <LinkItem to={`${matchPath}/issues`}>
      <Icon type="issues" />
      <LinkText>Issues and filters</LinkText>
    </LinkItem>
    <LinkItem to={`${matchPath}/settings`}>
      <Icon type="settings" />
      <LinkText>Project settings</LinkText>
    </LinkItem>
  </Sidebar>
);

ProjectSidebar.propTypes = propTypes;

export default ProjectSidebar;
