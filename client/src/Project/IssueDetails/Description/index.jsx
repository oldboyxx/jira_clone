import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getTextContentsFromHtmlString } from 'shared/utils/browser';
import { TextEditor, TextEditedContent, Button } from 'shared/components';

import { Title, EmptyLabel, Actions } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsDescription = ({ issue, updateIssue }) => {
  const [description, setDescription] = useState(issue.description);
  const [isEditing, setEditing] = useState(false);

  const isDescriptionEmpty = getTextContentsFromHtmlString(description).trim().length === 0;

  const handleUpdate = () => {
    setEditing(false);
    updateIssue({ description });
  };

  const renderPresentingMode = () =>
    isDescriptionEmpty ? (
      <EmptyLabel onClick={() => setEditing(true)}>Add a description...</EmptyLabel>
    ) : (
      <TextEditedContent content={description} onClick={() => setEditing(true)} />
    );

  const renderEditingMode = () => (
    <>
      <TextEditor
        placeholder="Describe the issue"
        defaultValue={description}
        onChange={setDescription}
      />
      <Actions>
        <Button variant="primary" onClick={handleUpdate}>
          Save
        </Button>
        <Button variant="empty" onClick={() => setEditing(false)}>
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

ProjectBoardIssueDetailsDescription.propTypes = propTypes;

export default ProjectBoardIssueDetailsDescription;
