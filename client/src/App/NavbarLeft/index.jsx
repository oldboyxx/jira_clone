import React from 'react';

import { Icon } from 'shared/components';
import { NavLeft, LogoLink, StyledLogo, Bottom, Item, ItemText } from './Styles';

const NavbarLeft = () => (
  <NavLeft>
    <LogoLink to="/">
      <StyledLogo color="#fff" />
    </LogoLink>
    <Item>
      <Icon type="search" size={22} top={1} left={3} />
      <ItemText>Search</ItemText>
    </Item>
    <Item>
      <Icon type="plus" size={27} />
      <ItemText>Create</ItemText>
    </Item>
    <Bottom>
      <Item>
        <Icon type="help" size={25} />
        <ItemText>Help</ItemText>
      </Item>
    </Bottom>
  </NavLeft>
);

export default NavbarLeft;
