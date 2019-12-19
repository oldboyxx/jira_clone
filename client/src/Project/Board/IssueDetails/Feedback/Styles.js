import styled from 'styled-components';

import { font } from 'shared/utils/styles';

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
