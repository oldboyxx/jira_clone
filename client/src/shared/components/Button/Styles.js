import styled, { css } from 'styled-components';

import { color, font, mixin } from 'shared/utils/styles';
import Spinner from 'shared/components/Spinner';

export const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  vertical-align: middle;
  line-height: 1;
  padding: 0 ${props => (props.iconOnly ? 9 : 12)}px;
  white-space: nowrap;
  border-radius: 3px;
  transition: all 0.1s;
  appearance: none;
  ${mixin.clickable}
  ${font.size(14.5)}
  ${props => buttonVariants[props.variant]}
  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const colored = css`
  color: #fff;
  background: ${props => color[props.variant]};
  ${font.medium}
  &:not(:disabled) {
    &:hover {
      background: ${props => mixin.lighten(color[props.variant], 0.15)};
    }
    &:active {
      background: ${props => mixin.darken(color[props.variant], 0.1)};
    }
    ${props =>
      props.isActive &&
      css`
        background: ${mixin.darken(color[props.variant], 0.1)} !important;
      `}
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
      css`
        color: ${color.primary};
        background: ${color.backgroundLightPrimary} !important;
      `}
  }
`;

const buttonVariants = {
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
`;

export const Text = styled.div`
  padding-left: ${props => (props.withPadding ? 7 : 0)}px;
`;
