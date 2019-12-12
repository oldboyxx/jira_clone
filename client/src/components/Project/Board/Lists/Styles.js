import styled from 'styled-components';

import { Avatar, Icon } from 'shared/components';
import { color, issueTypeColors, issuePriorityColors, font, mixin } from 'shared/utils/styles';

export const Lists = styled.div`
  display: flex;
  margin: 26px -5px 0;
`;

export const List = styled.div`
  margin: 0 5px;
  width: 25%;
  border-radius: 3px;
  background: ${color.backgroundLightest};
`;

export const ListTitle = styled.div`
  padding: 13px 10px 17px;
  text-transform: uppercase;
  color: ${color.textMedium};
  ${font.size(12.5)};
`;

export const ListIssuesCount = styled.span`
  text-transform: lowercase;
  ${font.size(13)};
`;

export const Issues = styled.div`
  padding: 0 5px;
`;

export const Issue = styled.div`
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0px 1px 2px 0px rgba(9, 30, 66, 0.25);
  transition: background 0.1s;
  ${mixin.clickable}
  &:hover {
    background: ${color.backgroundLight};
  }
`;

export const IssueTitle = styled.p`
  padding-bottom: 11px;
  ${font.size(15)}
`;

export const IssueBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const IssueTypeIcon = styled(Icon)`
  font-size: 19px;
  color: ${props => issueTypeColors[props.color]};
`;

export const IssuePriorityIcon = styled(Icon)`
  position: relative;
  top: -1px;
  margin-left: 4px;
  font-size: 18px;
  color: ${props => issuePriorityColors[props.color]};
`;

export const IssueAssignees = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-left: 2px;
`;

export const IssueAssigneeAvatar = styled(Avatar)`
  margin-left: -2px;
  box-shadow: 0 0 0 2px #fff;
`;
