import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';

import { KeyCodes } from 'shared/constants/keyCodes';
import { ClearIcon, Dropdown, DropdownInput, Options, Option, OptionsNoResults } from './Styles';

const propTypes = {
  value: PropTypes.any,
  isValueEmpty: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  $inputRef: PropTypes.object.isRequired,
  deactivateDropdown: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  isMulti: PropTypes.bool,
};

const defaultProps = {
  value: undefined,
  onCreate: undefined,
  isMulti: false,
};

const SelectDropdown = ({
  value,
  isValueEmpty,
  searchValue,
  setSearchValue,
  $inputRef,
  deactivateDropdown,
  options,
  onChange,
  onCreate,
  isMulti,
}) => {
  const [isCreatingOption, setCreatingOption] = useState(false);

  const $optionsRef = useRef();

  const selectOptionValue = optionValue => {
    deactivateDropdown();
    if (isMulti) {
      onChange(uniq([...value, optionValue]));
    } else {
      onChange(optionValue);
    }
  };

  const createOption = newOptionLabel => {
    setCreatingOption(true);
    onCreate(newOptionLabel, createdOptionValue => {
      setCreatingOption(false);
      selectOptionValue(createdOptionValue);
    });
  };

  const clearOptionValues = () => {
    $inputRef.current.value = '';
    $inputRef.current.focus();
    onChange(isMulti ? [] : null);
  };

  const handleInputKeyDown = event => {
    if (event.keyCode === KeyCodes.escape) {
      handleInputEscapeKeyDown(event);
    } else if (event.keyCode === KeyCodes.enter) {
      handleInputEnterKeyDown(event);
    } else if (event.keyCode === KeyCodes.arrowDown || event.keyCode === KeyCodes.arrowUp) {
      handleInputArrowUpOrDownKeyDown(event);
    }
  };

  const handleInputEscapeKeyDown = event => {
    event.nativeEvent.stopImmediatePropagation();
    deactivateDropdown();
  };

  const handleInputEnterKeyDown = event => {
    event.preventDefault();
    const $active = getActiveOptionNode();
    if (!$active) return;

    const optionValueToSelect = $active.getAttribute('data-select-option-value');
    const optionLabelToCreate = $active.getAttribute('data-create-option-label');

    if (optionValueToSelect) {
      selectOptionValue(optionValueToSelect);
    } else if (optionLabelToCreate) {
      createOption(optionLabelToCreate);
    }
  };

  const handleInputArrowUpOrDownKeyDown = event => {
    const $active = getActiveOptionNode();
    if (!$active) return;

    const $options = $optionsRef.current;
    const $optionsHeight = $options.getBoundingClientRect().height;
    const $activeHeight = $active.getBoundingClientRect().height;

    if (event.keyCode === KeyCodes.arrowDown) {
      if ($options.lastElementChild === $active) {
        $active.classList.remove(activeOptionClass);
        $options.firstElementChild.classList.add(activeOptionClass);
        $options.scrollTop = 0;
      } else {
        $active.classList.remove(activeOptionClass);
        $active.nextElementSibling.classList.add(activeOptionClass);
        if ($active.offsetTop > $options.scrollTop + $optionsHeight / 1.4) {
          $options.scrollTop += $activeHeight;
        }
      }
    } else if (event.keyCode === KeyCodes.arrowUp) {
      if ($options.firstElementChild === $active) {
        $active.classList.remove(activeOptionClass);
        $options.lastElementChild.classList.add(activeOptionClass);
        $options.scrollTop = $options.scrollHeight;
      } else {
        $active.classList.remove(activeOptionClass);
        $active.previousElementSibling.classList.add(activeOptionClass);
        if ($active.offsetTop < $options.scrollTop + $optionsHeight / 2.4) {
          $options.scrollTop -= $activeHeight;
        }
      }
    }
  };

  const handleOptionMouseEnter = event => {
    const $active = getActiveOptionNode();
    if ($active) $active.classList.remove(activeOptionClass);
    event.target.classList.add(activeOptionClass);
  };

  const getActiveOptionNode = () => $optionsRef.current.querySelector(`.${activeOptionClass}`);

  const optionsFilteredBySearchValue = options.filter(option =>
    option.label
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );

  const removeSelectedOptions = opts => opts.filter(option => !value.includes(option.value));

  const filteredOptions = isMulti
    ? removeSelectedOptions(optionsFilteredBySearchValue)
    : optionsFilteredBySearchValue;

  const searchValueNotInOptions = !options.map(option => option.label).includes(searchValue);
  const isOptionCreatable = onCreate && searchValue && searchValueNotInOptions;

  const renderSelectableOption = (option, i) => (
    <Option
      key={option.value}
      className={i === 0 ? activeOptionClass : undefined}
      isSelected={option.value === value}
      data-select-option-value={option.value}
      onMouseEnter={handleOptionMouseEnter}
      onClick={() => selectOptionValue(option.value)}
    >
      {option.label}
    </Option>
  );

  const renderCreatableOption = () => (
    <Option
      className={filteredOptions.length === 0 ? activeOptionClass : undefined}
      data-create-option-label={searchValue}
      onMouseEnter={handleOptionMouseEnter}
      onClick={() => createOption(searchValue)}
    >
      {isCreatingOption ? `Creating "${searchValue}"...` : `Create "${searchValue}"`}
    </Option>
  );

  return (
    <Dropdown>
      <DropdownInput
        type="text"
        placeholder="Search"
        ref={$inputRef}
        autoFocus
        onKeyDown={handleInputKeyDown}
        onChange={event => setSearchValue(event.target.value)}
      />
      {!isValueEmpty && <ClearIcon type="close" onClick={clearOptionValues} />}
      <Options ref={$optionsRef}>
        {filteredOptions.map(renderSelectableOption)}
        {isOptionCreatable && renderCreatableOption()}
        {filteredOptions.length === 0 && <OptionsNoResults>No results</OptionsNoResults>}
      </Options>
    </Dropdown>
  );
};

const activeOptionClass = 'jira-select-option-is-active';

SelectDropdown.propTypes = propTypes;
SelectDropdown.defaultProps = defaultProps;

export default SelectDropdown;
