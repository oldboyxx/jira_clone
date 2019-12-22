import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { Icon } from 'shared/components';
import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from './Styles';

const ProjectNavbarLeft = () => {
  const match = useRouteMatch();
  return (
    <NavLeft>
      <LogoLink to="/">
        <StyledLogo color="#fff" />
      </LogoLink>
      <Item>
        <Icon type="search" size={22} top={1} left={3} />
        <ItemText>Search issues</ItemText>
      </Item>
      <Link to={`${match.path}/board/create-issue`}>
        <Item>
          <Icon type="plus" size={27} />
          <ItemText>Create Issue</ItemText>
        </Item>
      </Link>
      <Bottom>
        <Item>
          <Icon type="help" size={25} />
          <ItemText>Help</ItemText>
        </Item>
      </Bottom>
    </NavLeft>
  );
};

export default ProjectNavbarLeft;
