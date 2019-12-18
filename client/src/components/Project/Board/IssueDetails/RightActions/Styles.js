import styled, { css } from 'styled-components';

import {
  color,
  issueStatusColors,
  issueStatusBackgroundColors,
  font,
  mixin,
} from 'shared/utils/styles';
import { Icon } from 'shared/components';

export const SectionTitle = styled.div`
  margin: 24px 0 5px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.size(12.5)}
  ${font.bold}
`;

export const User = styled.div`
  display: inline-flex;
  align-items: center;
  ${mixin.clickable}
  ${props =>
    props.isSelectValue &&
    css`
      margin: 0 10px ${props.withBottomMargin ? 5 : 0}px 0;
      padding: 4px 8px;
      border-radius: 4px;
      background: ${color.backgroundLight};
    `}
`;

export const UserName = styled.div`
  padding: 0 3px 0 8px;
  ${font.size(14.5)}
`;

export const StatusOption = styled.div`
  padding: 8px 16px;
  &.jira-select-option-is-active {
    background: ${color.backgroundLightPrimary};
  }
`;

export const Status = styled.div`
  text-transform: uppercase;
  ${props => mixin.tag(issueStatusBackgroundColors[props.color], issueStatusColors[props.color])}
  ${props => props.isLarge && `padding: 9px 14px 8px;`}
`;

export const UserOptionCont = styled.div`
  padding: 8px 12px 5px;
  ${mixin.clickable}
  &.jira-select-option-is-active {
    background: ${color.backgroundLightPrimary};
  }
`;

export const Priority = styled.div`
  display: flex;
  align-items: center;
`;

export const PriorityOption = styled.div`
  padding: 8px 12px;
  ${mixin.clickable}
  &.jira-select-option-is-active {
    background: ${color.backgroundLightPrimary};
  }
`;

export const PriorityLabel = styled.div`
  text-transform: capitalize;
  padding: 0 3px 0 8px;
  ${font.size(14.5)}
`;

export const Tracking = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2px;
  ${mixin.clickable};
`;

export const TrackingIcon = styled(Icon)`
  color: ${color.textMedium};
`;

export const TrackingRight = styled.div`
  width: 90%;
`;

export const TrackingBarCont = styled.div`
  height: 5px;
  border-radius: 4px;
  background: ${color.backgroundLight};
`;

export const TrackingBar = styled.div`
  height: 5px;
  border-radius: 4px;
  background: ${color.primary};
  transition: all 0.1s;
  width: ${props => props.width}%;
`;

export const TrackingValues = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 3px;
  ${font.size(14.5)};
`;

export const TrackingModalContents = styled.div`
  padding: 20px;
`;

export const TrackingModalTitle = styled.div`
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
