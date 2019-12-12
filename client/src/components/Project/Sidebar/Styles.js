import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { color, sizes, font, mixin } from 'shared/utils/styles';

export const Sidebar = styled.div`
  position: absolute;
  top: 0;
  left: ${sizes.appNavBarLeftWidth}px;
  height: 100vh;
  width: 240px;
  padding: 0 16px;
  background: ${color.backgroundLightest};
  border-right: 1px solid ${color.borderLightest};
`;

export const ProjectInfo = styled.div`
  display: flex;
  padding: 24px 4px;
`;

export const ProjectTexts = styled.div`
  padding: 3px 0 0 10px;
`;

export const ProjectName = styled.div`
  color: ${color.textDark};
  ${font.size(15)};
  ${font.medium};
`;

export const ProjectCategory = styled.div`
  color: ${color.textMedium};
  ${font.size(13)};
`;

export const LinkItem = styled(Link)`
  display: flex;
  padding: 8px 12px;
  border-radius: 3px;
  color: ${color.textDark};
  ${mixin.clickable}
  &:hover {
    background: ${color.backgroundLight};
  }
  i {
    margin-right: 15px;
    font-size: 20px;
    color: ${color.textDarkest};
  }
`;

export const LinkText = styled.div`
  padding-top: 2px;
  ${font.size(15)};
`;
