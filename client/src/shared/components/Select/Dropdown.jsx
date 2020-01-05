import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';

import { KeyCodes } from 'shared/constants/keyCodes';

import { ClearIcon, Dropdown, DropdownInput, Options, Option, OptionsNoResults } from './Styles';

const propTypes = {
  dropdownWidth: PropTypes.number,
  value: PropTypes.any,
  isValueEmpty: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  $inputRef: PropTypes.object.isRequired,
  deactivateDropdown: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onCreate: PropTypes.func,
  isMulti: PropTypes.bool.isRequired,
  withClearValue: PropTypes.bool.isRequired,
  propsRenderOption: PropTypes.func,
};

const defaultProps = {
  dropdownWidth: undefined,
  value: undefined,
  onCreate: undefined,
  propsRenderOption: undefined,
};

const SelectDropdown = ({
  dropdownWidth,
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
  withClearValue,
  propsRenderOption,
}) => {
  const [isCreatingOption, setCreatingOption] = useState(false);

  const $optionsRef = useRef();

  useLayoutEffect(() => {
    const setFirstOptionAsActive = () => {
      const $active = getActiveOptionNode();
      if ($active) $active.classList.remove(activeOptionClass);

      if ($optionsRef.current.firstElementChild) {
        $optionsRef.current.firstElementChild.classList.add(activeOptionClass);
      }
    };
    setFirstOptionAsActive();
  });

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
    if (event.keyCode === KeyCodes.ESCAPE) {
      handleInputEscapeKeyDown(event);
    } else if (event.keyCode === KeyCodes.ENTER) {
      handleInputEnterKeyDown(event);
    } else if (event.keyCode === KeyCodes.ARROW_DOWN || event.keyCode === KeyCodes.ARROW_UP) {
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

    if (event.keyCode === KeyCodes.ARROW_DOWN) {
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
    } else if (event.keyCode === KeyCodes.ARROW_UP) {
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
    event.currentTarget.classList.add(activeOptionClass);
  };

  const getActiveOptionNode = () => $optionsRef.current.querySelector(`.${activeOptionClass}`);

  const optionsFilteredBySearchValue = options.filter(option =>
    option.label
      .toString()
      .toLowerCase()
      .includes(searchValue.toLowerCase()),
  );

  const removeSelectedOptionsMulti = opts => opts.filter(option => !value.includes(option.value));
  const removeSelectedOptionsSingle = opts => opts.filter(option => value !== option.value);

  const filteredOptions = isMulti
    ? removeSelectedOptionsMulti(optionsFilteredBySearchValue)
    : removeSelectedOptionsSingle(optionsFilteredBySearchValue);

  const isSearchValueInOptions = options.map(option => option.label).includes(searchValue);
  const isOptionCreatable = onCreate && searchValue && !isSearchValueInOptions;

  return (
    <Dropdown width={dropdownWidth}>
      <DropdownInput
        type="text"
        placeholder="Search"
        ref={$inputRef}
        autoFocus
        onKeyDown={handleInputKeyDown}
        onChange={event => setSearchValue(event.target.value)}
      />

      {!isValueEmpty && withClearValue && <ClearIcon type="close" onClick={clearOptionValues} />}

      <Options ref={$optionsRef}>
        {filteredOptions.map(option => (
          <Option
            key={option.value}
            data-select-option-value={option.value}
            data-testid={`select-option:${option.label}`}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => selectOptionValue(option.value)}
          >
            {propsRenderOption ? propsRenderOption(option) : option.label}
          </Option>
        ))}

        {isOptionCreatable && (
          <Option
            data-create-option-label={searchValue}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => createOption(searchValue)}
          >
            {isCreatingOption ? `Creating "${searchValue}"...` : `Create "${searchValue}"`}
          </Option>
        )}
      </Options>

      {filteredOptions.length === 0 && <OptionsNoResults>No results</OptionsNoResults>}
    </Dropdown>
  );
};

const activeOptionClass = 'jira-select-option-is-active';

SelectDropdown.propTypes = propTypes;
SelectDropdown.defaultProps = defaultProps;

export default SelectDropdown;
