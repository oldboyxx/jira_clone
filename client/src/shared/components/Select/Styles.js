import styled, { css } from 'styled-components';

import { color, font, mixin, zIndexValues } from 'shared/utils/styles';
import Icon from 'shared/components/Icon';

export const StyledSelect = styled.div`
  position: relative;
  width: 100%;
  border-radius: 4px;
  border: 1px solid ${color.borderLightest};
  background: #fff;
  ${font.size(14)}
  &:focus {
    outline: none;
    background: #fff;
    border: 1px solid ${color.borderInputFocus};
    box-shadow: 0 0 0 1px ${color.borderInputFocus};
  }
  ${props => props.invalid && `&, &:focus { border: 1px solid ${color.danger}; }`}
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 32px;
  width: 100%;
  padding: 8px 5px 8px 10px;
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
  padding-top: 5px;
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
  width: 100%;
  border-radius: 4px;
  background: #fff;
  ${mixin.boxShadowDropdown}
`;

export const DropdownInput = styled.input`
  padding: 10px 12px 8px;
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
    background: ${color.backgroundLightPrimary};
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
