import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';

export default styled.div`
  display: inline-block;
  width: 100%;
  textarea {
    width: 100%;
    padding: 13px 15px 14px;
    border-radius: 4px;
    border: 1px solid ${color.borderLight};
    box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.03);
    background: #fff;
    overflow-y: hidden;
    ${font.regular}
    ${font.size(14)}
    &:focus {
      border: 1px solid ${color.borderMedium};
    }
    ${props => (props.invalid ? `&, &:focus { border: 1px solid ${color.danger}; }` : '')}
  }
`;
