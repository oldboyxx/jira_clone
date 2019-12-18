import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';
import { Button } from 'shared/components';

export const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 21px 18px 0;
`;

export const TypeButton = styled(Button)`
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${color.textMedium};
  ${font.size(13)}
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin-left: 4px;
  }
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

export const FeedbackDropdown = styled.div`
  padding: 16px 24px 24px;
`;

export const FeedbackImageCont = styled.div`
  padding: 24px 56px 20px;
`;

export const FeedbackImage = styled.img`
  width: 100%;
`;

export const FeedbackParagraph = styled.p`
  margin-bottom: 12px;
  ${font.size(15)}
  &:last-of-type {
    margin-bottom: 22px;
  }
`;
