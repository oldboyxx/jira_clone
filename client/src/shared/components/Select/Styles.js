import styled, { css } from 'styled-components';

import { color, font, mixin, zIndexValues } from 'shared/utils/styles';
import Icon from 'shared/components/Icon';

export const StyledSelect = styled.div`
  position: relative;
  border-radius: 4px;
  cursor: pointer;
  background: #fff;
  ${font.size(14)}
  ${props => props.variant === 'empty' && `display: inline-block;`}
  ${props =>
    props.variant === 'border' &&
    css`
      width: 100%;
      border: 1px solid ${color.borderLightest};
    `}
  &:focus {
    outline: none;
    ${props =>
      props.variant === 'border' &&
      css`
        background: #fff;
        border: 1px solid ${color.borderInputFocus};
        box-shadow: 0 0 0 1px ${color.borderInputFocus};
      }
    `}
  }
  ${props => props.invalid && `&, &:focus { border: 1px solid ${color.danger}; }`}
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  ${props =>
    props.variant === 'border' &&
    css`
      min-height: 32px;
      padding: 8px 5px 8px 10px;
    `}
`;

export const ChevronIcon = styled(Icon)`
  margin-left: auto;
  font-size: 18px;
  color: ${color.textMedium};
`;

export const Placeholder = styled.div`
  color: ${color.textLight};
`;

export const ValueMulti = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  ${props => props.variant === 'border' && `padding-top: 5px;`}
`;

export const ValueMultiItem = styled.div`
  margin: 0 5px 5px 0;
  ${mixin.tag()}
`;

export const AddMore = styled.div`
  display: inline-block;
  margin-bottom: 3px;
  padding: 3px 0;
  ${font.size(12.5)}
  ${mixin.link()}
  i {
    margin-right: 3px;
    vertical-align: middle;
    font-size: 14px;
  }
`;

export const Dropdown = styled.div`
  z-index: ${zIndexValues.dropdown};
  position: absolute;
  top: 100%;
  left: 0;
  border-radius: 0 0 4px 4px;
  background: #fff;
  ${mixin.boxShadowDropdown}
  ${props => (props.width ? `width: ${props.width}px;` : 'width: 100%;')}
`;

export const DropdownInput = styled.input`
  padding: 10px 14px 8px;
  width: 100%;
  border: none;
  color: ${color.textDarkest};
  background: none;
  &:focus {
    outline: none;
  }
`;

export const ClearIcon = styled(Icon)`
  position: absolute;
  top: 4px;
  right: 7px;
  padding: 5px;
  font-size: 16px;
  color: ${color.textMedium};
  ${mixin.clickable}
`;

export const Options = styled.div`
  max-height: 200px;
  ${mixin.scrollableY};
  ${mixin.customScrollbar()};
`;

export const Option = styled.div`
  padding: 8px 14px;
  word-break: break-word;
  cursor: pointer;
  &:last-of-type {
    margin-bottom: 8px;
  }
  &.jira-select-option-is-active {
    background: ${color.backgroundLightPrimary};
  }
`;

export const OptionsNoResults = styled.div`
  padding: 5px 15px 15px;
  color: ${color.textLight};
`;
