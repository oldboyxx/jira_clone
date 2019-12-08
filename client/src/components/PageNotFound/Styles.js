import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';

export const Wrapper = styled.div`
  margin: 50px auto 0;
  max-width: 500px;
  padding: 50px 50px 60px;
  text-align: center;
  border-radius: 4px;
  background: ${color.backgroundLight};
`;

export const Heading = styled.h1`
  ${font.size(60)}
`;

export const Message = styled.p`
  color: ${color.textDark};
  padding: 10px 0 30px;
  line-height: 1.35;
  ${font.size(20)}
`;
