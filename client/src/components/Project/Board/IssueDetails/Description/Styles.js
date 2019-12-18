import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';

export const Title = styled.div`
  padding: 20px 0 6px;
  ${font.size(15)}
  ${font.medium}
`;

export const EmptyLabel = styled.div`
  margin-left: -7px;
  padding: 7px;
  border-radius: 3px;
  color: ${color.textMedium}
  transition: background 0.1s;
  ${font.size(15)}
  ${mixin.clickable}
  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const Actions = styled.div`
  display: flex;
  padding-top: 12px;
  & > button {
    margin-right: 6px;
  }
`;
