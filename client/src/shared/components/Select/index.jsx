import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import useOnOutsideClick from 'shared/hooks/onOutsideClick';
import { KeyCodes } from 'shared/constants/keyCodes';
import Icon from 'shared/components/Icon';
import Dropdown from './Dropdown';
import {
  StyledSelect,
  StyledIcon,
  ValueContainer,
  ChevronIcon,
  Placeholder,
  ValueSingle,
  ValueMulti,
  ValueMultiItem,
  AddMore,
} from './Styles';

const propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  isMulti: PropTypes.bool,
};

const defaultProps = {
  className: undefined,
  icon: undefined,
  value: undefined,
  defaultValue: undefined,
  placeholder: '',
  invalid: false,
  onCreate: undefined,
  isMulti: false,
};

const Select = ({
  className,
  icon,
  value: propsValue,
  defaultValue,
  placeholder,
  invalid,
  options,
  onChange,
  onCreate,
  isMulti,
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

  const handleChange = newValue => {
    if (!isControlled) {
      setStateValue(newValue);
    }
    onChange(newValue);
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

  const renderSingleValue = () => <ValueSingle>{getOptionLabel(value)}</ValueSingle>;

  const renderMultiValue = () => (
    <ValueMulti>
      {value.map(optionValue => (
        <ValueMultiItem key={optionValue} onClick={() => removeOptionValue(optionValue)}>
          {getOptionLabel(optionValue)}
          <Icon type="close" />
        </ValueMultiItem>
      ))}
      <AddMore>
        <Icon type="plus" />
        Add more
      </AddMore>
    </ValueMulti>
  );

  return (
    <StyledSelect
      className={className}
      ref={$selectRef}
      tabIndex="0"
      hasIcon={!!icon}
      onKeyDown={handleFocusedSelectKeydown}
      invalid={invalid}
    >
      <ValueContainer onClick={activateDropdown}>
        {icon && <StyledIcon type={icon} />}
        {(!isMulti || isValueEmpty) && <ChevronIcon type="chevron-down" />}
        {isValueEmpty && <Placeholder>{placeholder}</Placeholder>}
        {!isValueEmpty && !isMulti && renderSingleValue()}
        {!isValueEmpty && isMulti && renderMultiValue()}
      </ValueContainer>
      {isDropdownOpen && (
        <Dropdown
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
        />
      )}
    </StyledSelect>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
