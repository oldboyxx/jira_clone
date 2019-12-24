import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { Textarea } from 'shared/components';

import { Actions, FormButton } from './Styles';

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isWorking: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsCommentsBodyForm = ({
  value,
  onChange,
  isWorking,
  onSubmit,
  onCancel,
}) => {
  const $textareaRef = useRef();

  return (
    <>
      <Textarea
        autoFocus
        placeholder="Add a comment..."
        value={value}
        onChange={onChange}
        ref={$textareaRef}
      />
      <Actions>
        <FormButton
          variant="primary"
          isWorking={isWorking}
          onClick={() => {
            if ($textareaRef.current.value.trim()) {
              onSubmit();
            }
          }}
        >
          Save
        </FormButton>
        <FormButton variant="empty" onClick={onCancel}>
          Cancel
        </FormButton>
      </Actions>
    </>
  );
};

ProjectBoardIssueDetailsCommentsBodyForm.propTypes = propTypes;

export default ProjectBoardIssueDetailsCommentsBodyForm;
