import styled, { css } from 'styled-components';

import { issueStatusColors, issueStatusBackgroundColors, mixin } from 'shared/utils/styles';

export const Status = styled.div`
  text-transform: uppercase;
  transition: all 0.1s;
  ${props => mixin.tag(issueStatusBackgroundColors[props.color], issueStatusColors[props.color])}
  ${props =>
    props.isValue &&
    css`
      padding: 0 12px;
      height: 32px;
      &:hover {
        transform: scale(1.05);
      }
    `}
`;
