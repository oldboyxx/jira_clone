import styled from 'styled-components';

import { Icon } from 'shared/components';
import { issuePriorityColors } from 'shared/utils/styles';

export const PriorityIcon = styled(Icon)`
  font-size: 18px;
  color: ${props => issuePriorityColors[props.color]};
`;
