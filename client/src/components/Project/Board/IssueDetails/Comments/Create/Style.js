import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';
import { Avatar } from 'shared/components';

export const Create = styled.div`
  position: relative;
  margin-top: 25px;
  ${font.size(15)}
`;

export const UserAvatar = styled(Avatar)`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Right = styled.div`
  padding-left: 44px;
`;

export const FakeTextarea = styled.div`
  padding: 12px 20px;
  border-radius: 4px;
  border: 1px solid ${color.borderLightest};
  color: ${color.textLight};
  ${mixin.clickable}
  &:hover {
    border: 1px solid ${color.borderLight};
  }
`;

export const Tip = styled.div`
  display: flex;
  align-items: center;
  padding-top: 8px;
  color: ${color.textMedium};
  ${font.size(13)}
  strong {
    padding-right: 4px;
  }
`;

export const TipLetter = styled.span`
  position: relative;
  top: 1px;
  display: inline-block;
  margin: 0 4px;
  padding: 0 4px;
  border-radius: 2px;
  color: ${color.textDarkest};
  background: ${color.backgroundMedium};
  ${font.bold}
  ${font.size(12)}
`;
