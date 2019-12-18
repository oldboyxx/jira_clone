import styled, { css } from 'styled-components';

import Spinner from 'shared/components/Spinner';
import { color, font, mixin } from 'shared/utils/styles';

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  line-height: 1;
  padding: 0 ${props => (props.iconOnly ? 9 : 12)}px;
  white-space: nowrap;
  border-radius: 3px;
  transition: all 0.1s;
  appearance: none;
  ${mixin.clickable}
  ${font.size(14.5)}
  ${props => buttonColors[props.color]}
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  i {
    margin-right: ${props => (props.iconOnly ? 0 : 7)}px;
  }
`;

const colored = css`
  color: #fff;
  background: ${props => color[props.color]};
  ${font.medium}
  &:not(:disabled) {
    &:hover {
      background: ${props => mixin.lighten(color[props.color], 0.15)};
    }
    &:active {
      background: ${props => mixin.darken(color[props.color], 0.1)};
    }
    ${props => props.isActive && `background: ${mixin.darken(color[props.color], 0.1)} !important;`}
  }
`;

const secondaryAndEmptyShared = css`
  color: ${color.textDark};
  ${font.regular}
  &:not(:disabled) {
    &:hover {
      background: ${color.backgroundLight};
    }
    &:active {
      color: ${color.primary};
      background: ${color.backgroundLightPrimary};
    }
    ${props =>
      props.isActive &&
      `
      color: ${color.primary};
      background: ${color.backgroundLightPrimary} !important;
    `}
  }
`;

const buttonColors = {
  primary: colored,
  success: colored,
  danger: colored,
  secondary: css`
    background: ${color.secondary};
    ${secondaryAndEmptyShared};
  `,
  empty: css`
    background: #fff;
    ${secondaryAndEmptyShared};
  `,
};

export const StyledSpinner = styled(Spinner)`
  position: relative;
  top: 1px;
  margin-right: ${props => (props.iconOnly ? 0 : 7)}px;
`;
