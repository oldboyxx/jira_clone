import styled from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';
import { Icon } from 'shared/components';

export const TrackingLink = styled.div`
  padding: 4px 4px 2px 0;
  border-radius: 4px;
  transition: background 0.1s;
  ${mixin.clickable}
  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const Tracking = styled.div`
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

export const ModalContents = styled.div`
  padding: 20px 25px 25px;
`;

export const ModalTitle = styled.div`
  padding-bottom: 14px;
  ${font.medium}
  ${font.size(20)}
`;

export const Inputs = styled.div`
  display: flex;
  margin: 20px -5px 30px;
`;

export const InputCont = styled.div`
  margin: 0 5px;
  width: 50%;
`;

export const InputLabel = styled.div`
  padding-bottom: 5px;
  color: ${color.textMedium};
  ${font.medium};
  ${font.size(13)};
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;
