import styled from 'styled-components';

import { issuePriorityColors } from 'shared/utils/styles';
import { Icon } from 'shared/components';

export const PriorityIcon = styled(Icon)`
  color: ${props => issuePriorityColors[props.color]};
`;
