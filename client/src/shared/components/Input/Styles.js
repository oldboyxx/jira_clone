import styled from 'styled-components';

import { color, font } from 'shared/utils/styles';

export default styled.div`
  position: relative;
  display: inline-block;
  height: 32px;
  width: 100%;
  input {
    height: 100%;
    width: 100%;
    padding: 0 7px;
    border-radius: 3px;
    border: 1px solid ${color.borderLightest};
    background: ${color.backgroundLightest};
    transition: background 0.1s;
    ${font.regular}
    ${font.size(15)}
    &:hover {
      background: ${color.backgroundLight};
    }
    &:focus {
      background: #fff;
      border: 1px solid ${color.borderInputFocus};
      box-shadow: 0 0 0 1px ${color.borderInputFocus};
    }
    ${props => (props.icon ? 'padding-left: 32px;' : '')}
    ${props => (props.invalid ? `&, &:focus { border: 1px solid ${color.danger}; }` : '')}
  }
  i {
    position: absolute;
    top: 8px;
    left: 8px;
    pointer-events: none;
    color: ${color.textMedium};
  }
`;
