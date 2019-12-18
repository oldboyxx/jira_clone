import styled from 'styled-components';

import { color, issueStatusColors, issueStatusBackgroundColors, mixin } from 'shared/utils/styles';

export const Status = styled.div`
  text-transform: uppercase;
  ${props => mixin.tag(issueStatusBackgroundColors[props.color], issueStatusColors[props.color])}
  ${props => props.isLarge && `padding: 9px 14px 8px;`}
`;

export const Option = styled.div`
  padding: 8px 16px;
  &.jira-select-option-is-active {
    background: ${color.backgroundLightPrimary};
  }
`;
