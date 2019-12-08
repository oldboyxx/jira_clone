import React from 'react';

import { Icon } from 'shared/components';
import { NavLeft, LogoLink, StyledLogo, IconLink, LinkText } from './Styles';

const NavbarLeft = () => (
  <NavLeft>
    <LogoLink to="/">
      <StyledLogo color="#fff" />
    </LogoLink>
    <IconLink to="/projects">
      <Icon type="archive" size={16} />
      <LinkText>Projects</LinkText>
    </IconLink>
    <IconLink to="/subcontractors">
      <Icon type="briefcase" size={16} />
      <LinkText>Subcontractors</LinkText>
    </IconLink>
    <IconLink to="/bids">
      <Icon type="file-text" size={20} left={-2} />
      <LinkText>Bids</LinkText>
    </IconLink>
  </NavLeft>
);

export default NavbarLeft;
