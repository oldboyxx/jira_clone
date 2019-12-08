import styled, { css } from 'styled-components';

import Spinner from 'shared/components/Spinner';
import { color, font, mixin } from 'shared/utils/styles';

export const StyledButton = styled.button`
  display: inline-block;
  height: 36px;
  line-height: 34px;
  padding: 0 18px;
  vertical-align: middle;
  white-space: nowrap;
  text-align: center;
  border-radius: 4px;
  transition: all 0.1s;
  appearance: none !important;
  ${mixin.clickable}
  ${font.bold}
  ${font.size(14)}
  ${props => (props.hollow ? hollowStyles : filledStyles)}
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  i {
    position: relative;
    top: -1px;
    right: 4px;
    margin-right: 7px;
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-size: 16px;
  }
  ${props => (props.iconOnly ? iconOnlyStyles : '')}
`;

const filledStyles = props => css`
  color: #fff;
  background: ${color[props.color]};
  border: 1px solid ${color[props.color]};
  ${!props.disabled &&
    css`
      &:hover,
      &:focus {
        background: ${mixin.darken(color[props.color], 0.15)};
        border: 1px solid ${mixin.darken(color[props.color], 0.15)};
      }
      &:active {
        background: ${mixin.lighten(color[props.color], 0.1)};
        border: 1px solid ${mixin.lighten(color[props.color], 0.1)};
      }
    `}
`;

const hollowStyles = props => css`
  color: ${color.textMediumBlue};
  background: #fff;
  border: 1px solid ${color.borderBlue};
  ${!props.disabled &&
    css`
      &:hover,
      &:focus {
        border: 1px solid ${mixin.darken(color.borderBlue, 0.15)};
      }
      &:active {
        border: 1px solid ${color.borderBlue};
      }
    `}
`;

const iconOnlyStyles = css`
  padding: 0 12px;
  i {
    right: 0;
    margin-right: 0;
  }
`;

export const StyledSpinner = styled(Spinner)`
  position: relative;
  right: 8px;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
`;
