import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';

export const Breadcrumbs = styled.div`
  color: ${color.textMedium};
  ${font.size(15)};
`;

export const Divider = styled.span`
  position: relative;
  top: 2px;
  margin: 0 10px;
  ${font.size(18)};
`;

export const Header = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
`;

export const BoardName = styled.div`
  ${font.size(24)}
  ${font.medium}
`;
