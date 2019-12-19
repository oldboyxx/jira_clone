import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import { KeyCodes } from 'shared/constants/keyCodes';
import Icon from 'shared/components/Icon';
import Dropdown from './Dropdown';
import {
  StyledSelect,
  ValueContainer,
  ChevronIcon,
  Placeholder,
  ValueMulti,
  ValueMultiItem,
  AddMore,
} from './Styles';

const propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['border', 'empty']),
  dropdownWidth: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  isMulti: PropTypes.bool,
  renderValue: PropTypes.func,
  renderOption: PropTypes.func,
};

const defaultProps = {
  className: undefined,
  variant: 'empty',
  dropdownWidth: undefined,
  value: undefined,
  defaultValue: undefined,
  placeholder: 'Select',
  invalid: false,
  onCreate: undefined,
  isMulti: false,
  renderValue: undefined,
  renderOption: undefined,
};

const Select = ({
  className,
  variant,
  dropdownWidth,
  value: propsValue,
  defaultValue,
  placeholder,
  invalid,
  options,
  onChange,
  onCreate,
  isMulti,
  renderValue: propsRenderValue,
  renderOption: propsRenderOption,
}) => {
  const [stateValue, setStateValue] = useState(defaultValue || (isMulti ? [] : null));
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const isControlled = propsValue !== undefined;
  const value = isControlled ? propsValue : stateValue;

  const $selectRef = useRef();
  const $inputRef = useRef();

  const activateDropdown = () => {
    if (isDropdownOpen) {
      $inputRef.current.focus();
    } else {
      setDropdownOpen(true);
    }
  };

  const deactivateDropdown = () => {
    setDropdownOpen(false);
    setSearchValue('');
    $selectRef.current.focus();
  };

  useOnOutsideClick($selectRef, isDropdownOpen, deactivateDropdown);

  const preserveValueType = newValue => {
    const areOptionValuesNumbers = options.some(option => typeof option.value === 'number');

    if (areOptionValuesNumbers) {
      if (isMulti) {
        return newValue.map(Number);
      }
      if (newValue) {
        return Number(newValue);
      }
    }
    return newValue;
  };

  const handleChange = newValue => {
    if (!isControlled) {
      setStateValue(preserveValueType(newValue));
    }
    onChange(preserveValueType(newValue));
  };

  const removeOptionValue = optionValue => {
    handleChange(value.filter(val => val !== optionValue));
  };

  const handleFocusedSelectKeydown = event => {
    if (isDropdownOpen) return;

    if (event.keyCode === KeyCodes.ENTER) {
      event.preventDefault();
    }
    if (event.keyCode !== KeyCodes.ESCAPE && event.keyCode !== KeyCodes.TAB && !event.shiftKey) {
      setDropdownOpen(true);
    }
  };

  const getOption = optionValue => options.find(option => option.value === optionValue);
  const getOptionLabel = optionValue => (getOption(optionValue) || { label: '' }).label;

  const isValueEmpty = isMulti ? !value.length : !getOption(value);

  const renderSingleValue = () =>
    propsRenderValue ? propsRenderValue({ value }) : getOptionLabel(value);

  const renderMultiValue = () => (
    <ValueMulti variant={variant}>
      {value.map(optionValue =>
        propsRenderValue ? (
          propsRenderValue({ value: optionValue, removeOptionValue })
        ) : (
          <ValueMultiItem key={optionValue} onClick={() => removeOptionValue(optionValue)}>
            {getOptionLabel(optionValue)}
            <Icon type="close" size={14} />
          </ValueMultiItem>
        ),
      )}
      <AddMore>
        <Icon type="plus" />
        Add more
      </AddMore>
    </ValueMulti>
  );

  return (
    <StyledSelect
      className={className}
      variant={variant}
      ref={$selectRef}
      tabIndex="0"
      onKeyDown={handleFocusedSelectKeydown}
      invalid={invalid}
    >
      <ValueContainer variant={variant} onClick={activateDropdown}>
        {isValueEmpty && <Placeholder>{placeholder}</Placeholder>}
        {!isValueEmpty && !isMulti && renderSingleValue()}
        {!isValueEmpty && isMulti && renderMultiValue()}
        {(!isMulti || isValueEmpty) && variant !== 'empty' && (
          <ChevronIcon type="chevron-down" top={1} />
        )}
      </ValueContainer>
      {isDropdownOpen && (
        <Dropdown
          dropdownWidth={dropdownWidth}
          value={value}
          isValueEmpty={isValueEmpty}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          $selectRef={$selectRef}
          $inputRef={$inputRef}
          deactivateDropdown={deactivateDropdown}
          options={options}
          onChange={handleChange}
          onCreate={onCreate}
          isMulti={isMulti}
          propsRenderOption={propsRenderOption}
        />
      )}
    </StyledSelect>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
