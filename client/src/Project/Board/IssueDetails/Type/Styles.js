import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';
import { Button } from 'shared/components';

export const TypeButton = styled(Button)`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${color.textMedium};
  ${font.size(13)}
`;

export const TypeDropdown = styled.div`
  padding-bottom: 6px;
`;

export const TypeTitle = styled.div`
  padding: 10px 0 7px 12px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.size(12)}
`;

export const Type = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 12px;
  ${mixin.clickable}
  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const TypeLabel = styled.div`
  padding: 0 5px 0 7px;
  text-transform: capitalize;
  ${font.size(15)}
`;
