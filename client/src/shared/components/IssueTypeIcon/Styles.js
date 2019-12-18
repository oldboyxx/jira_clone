import styled from 'styled-components';

import { Icon } from 'shared/components';
import { issueTypeColors } from 'shared/utils/styles';

export const TypeIcon = styled(Icon)`
  font-size: 18px;
  color: ${props => issueTypeColors[props.color]};
`;
