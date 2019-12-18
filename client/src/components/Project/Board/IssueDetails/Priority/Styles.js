import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';

export const Priority = styled.div`
  display: flex;
  align-items: center;
`;

export const Option = styled.div`
  padding: 8px 12px;
  ${mixin.clickable}
  &.jira-select-option-is-active {
    background: ${color.backgroundLightPrimary};
  }
`;

export const Label = styled.div`
  text-transform: capitalize;
  padding: 0 3px 0 8px;
  ${font.size(14.5)}
`;
