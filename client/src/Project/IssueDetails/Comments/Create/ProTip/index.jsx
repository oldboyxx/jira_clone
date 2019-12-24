import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { KeyCodes } from 'shared/constants/keyCodes';
import { isFocusedElementEditable } from 'shared/utils/browser';

import { Tip, TipLetter } from './Styles';

const propTypes = {
  setFormOpen: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsCommentsCreateProTip = ({ setFormOpen }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (!isFocusedElementEditable() && event.keyCode === KeyCodes.M) {
        event.preventDefault();
        setFormOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setFormOpen]);

  return (
    <Tip>
      <strong>Pro tip:</strong>press<TipLetter>M</TipLetter>to comment
    </Tip>
  );
};

ProjectBoardIssueDetailsCommentsCreateProTip.propTypes = propTypes;

export default ProjectBoardIssueDetailsCommentsCreateProTip;
