import styled, { css } from 'styled-components';

import { color, font, mixin, zIndexValues } from 'shared/utils/styles';
import Icon from 'shared/components/Icon';

export const StyledSelect = styled.div`
  position: relative;
  width: 100%;
  border-radius: 3px;
  border: 1px solid ${color.borderLight};
  background: #fff;
  ${font.size(14)}
  &:focus {
    outline: none;
    border: 1px solid ${color.borderMedium};
  }
  ${props => (props.hasIcon ? 'padding-left: 25px;' : '')}
  ${props => (props.invalid ? `&, &:focus { border: 1px solid ${color.danger}; }` : '')}
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  top: 12px;
  left: 14px;
  font-size: 16px;
  color: ${color.textMedium};
`;

export const ValueContainer = styled.div`
  min-height: 38px;
  width: 100%;
`;

export const ChevronIcon = styled(Icon)`
  position: absolute;
  top: 10px;
  right: 11px;
  font-size: 18px;
  color: ${color.textMedium};
`;

export const Placeholder = styled.div`
  padding: 11px 0 0 15px;
  color: ${color.textLight};
`;

export const ValueSingle = styled.div`
  padding: 11px 0 0 15px;
`;

export const ValueMulti = styled.div`
  padding: 15px 5px 10px 10px;
`;

export const ValueMultiItem = styled.div`
  margin: 0 5px 5px 0;
  ${mixin.tag}
`;

export const AddMore = styled.div`
  display: inline-block;
  height: 24px;
  line-height: 22px;
  padding-right: 5px;
  ${font.size(12)}
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
  width: 100%;
  background: #fff;
  ${mixin.boxShadowBorderMedium}
`;

export const DropdownInput = styled.input`
  padding: 10px 15px 8px;
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
  padding: 5px 15px;
  word-break: break-word;
  &:hover {
    cursor: pointer;
  }
  &:last-of-type {
    margin-bottom: 8px;
  }
  &.jira-select-option-is-active {
    background: ${mixin.lighten(color.backgroundMedium, 0.05)};
  }
  ${props => (props.isSelected ? selectedOptionStyles : '')}
`;

const selectedOptionStyles = css`
  color: #fff !important;
  background: ${color.primary} !important;
`;

export const OptionsNoResults = styled.div`
  padding: 5px 15px 15px;
  color: ${color.textLight};
`;
