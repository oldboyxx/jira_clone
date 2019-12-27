import styled from 'styled-components';

import { issueTypeColors } from 'shared/utils/styles';
import { Icon } from 'shared/components';

export const TypeIcon = styled(Icon)`
  color: ${props => issueTypeColors[props.color]};
`;
