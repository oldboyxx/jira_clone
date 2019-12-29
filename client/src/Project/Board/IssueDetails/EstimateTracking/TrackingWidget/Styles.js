import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';
import { Icon } from 'shared/components';

export const TrackingWidget = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WatchIcon = styled(Icon)`
  color: ${color.textMedium};
`;

export const Right = styled.div`
  width: 90%;
`;

export const BarCont = styled.div`
  height: 5px;
  border-radius: 4px;
  background: ${color.backgroundMedium};
`;

export const Bar = styled.div`
  height: 5px;
  border-radius: 4px;
  background: ${color.primary};
  transition: all 0.1s;
  width: ${props => props.width}%;
`;

export const Values = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 3px;
  ${font.size(14.5)};
`;
