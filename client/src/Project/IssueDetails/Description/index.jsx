import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getTextContentsFromHtmlString } from 'shared/utils/html';
import { TextEditor, TextEditedContent, Button } from 'shared/components';
import { Title, EmptyLabel, Actions } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsDescription = ({ issue, updateIssue }) => {
  const [value, setValue] = useState(issue.description);
  const [isEditing, setEditing] = useState(false);

  const renderPresentingMode = () =>
    isDescriptionEmpty(issue.description) ? (
      <EmptyLabel onClick={() => setEditing(true)}>Add a description...</EmptyLabel>
    ) : (
      <TextEditedContent content={issue.description} onClick={() => setEditing(true)} />
    );

  const renderEditingMode = () => (
    <>
      <TextEditor placeholder="Describe the issue" defaultValue={value} onChange={setValue} />
      <Actions>
        <Button
          color="primary"
          onClick={() => {
            setEditing(false);
            updateIssue({ description: value });
          }}
        >
          Save
        </Button>
        <Button color="empty" onClick={() => setEditing(false)}>
          Cancel
        </Button>
      </Actions>
    </>
  );
  return (
    <>
      <Title>Description</Title>
      {isEditing ? renderEditingMode() : renderPresentingMode()}
    </>
  );
};

const isDescriptionEmpty = description =>
  getTextContentsFromHtmlString(description).trim().length === 0;

ProjectBoardIssueDetailsDescription.propTypes = propTypes;

export default ProjectBoardIssueDetailsDescription;
