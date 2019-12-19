import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { getTextContentsFromHtmlString } from 'shared/utils/html';
import { TextEditor, TextEditedContent, Button } from 'shared/components';
import { Title, EmptyLabel, Actions } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsDescription = ({ issue, updateIssue }) => {
  const $editorRef = useRef();
  const [isPresenting, setPresenting] = useState(true);

  const renderPresentingMode = () =>
    isDescriptionEmpty(issue.description) ? (
      <EmptyLabel onClick={() => setPresenting(false)}>Add a description...</EmptyLabel>
    ) : (
      <TextEditedContent content={issue.description} onClick={() => setPresenting(false)} />
    );

  const renderEditingMode = () => (
    <>
      <TextEditor
        placeholder="Describe the issue"
        defaultValue={issue.description}
        getEditor={editor => ($editorRef.current = editor)}
      />
      <Actions>
        <Button
          color="primary"
          onClick={() => {
            setPresenting(true);
            updateIssue({ description: $editorRef.current.getHTML() });
          }}
        >
          Save
        </Button>
        <Button color="empty" onClick={() => setPresenting(true)}>
          Cancel
        </Button>
      </Actions>
    </>
  );
  return (
    <>
      <Title>Description</Title>
      {isPresenting ? renderPresentingMode() : renderEditingMode()}
    </>
  );
};

const isDescriptionEmpty = description =>
  getTextContentsFromHtmlString(description).trim().length === 0;

ProjectBoardIssueDetailsDescription.propTypes = propTypes;

export default ProjectBoardIssueDetailsDescription;
