import styled from 'styled-components';

import { issuePriorityColors } from 'shared/utils/styles';
import { Icon } from 'shared/components';

export const PriorityIcon = styled(Icon)`
  font-size: 18px;
  color: ${props => issuePriorityColors[props.color]};
`;
