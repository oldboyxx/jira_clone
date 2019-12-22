import styled, { css } from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';

export const User = styled.div`
  display: flex;
  align-items: center;
  ${mixin.clickable}
  ${props =>
    props.isSelectValue &&
    css`
      margin: 0 10px ${props.withBottomMargin ? 5 : 0}px 0;
      padding: 4px 8px;
      border-radius: 4px;
      background: ${color.backgroundLight};
      transition: background 0.1s;
      &:hover {
        background: ${color.backgroundMedium};
      }
    `}
`;

export const Username = styled.div`
  padding: 0 3px 0 8px;
  ${font.size(14.5)}
`;
