import React from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import toast from 'shared/utils/toast';
import { IssueType } from 'shared/constants/issues';
import { IssueTypeIcon, Button, CopyLinkButton, Tooltip, ConfirmModal } from 'shared/components';
import feedbackImage from './assets/feedback.png';
import {
  TopActions,
  TypeButton,
  Right,
  TypeDropdown,
  TypeTitle,
  Type,
  TypeLabel,
  FeedbackDropdown,
  FeedbackImageCont,
  FeedbackImage,
  FeedbackParagraph,
} from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsTopActions = ({ issue, updateIssue, fetchProject, modalClose }) => {
  const handleIssueDelete = async () => {
    try {
      await api.delete(`/issues/${issue.id}`);
      await fetchProject();
      modalClose();
    } catch (error) {
      toast.error(error);
    }
  };

  const renderType = () => (
    <Tooltip
      width={150}
      offset={{ top: -15 }}
      renderLink={linkProps => (
        <TypeButton {...linkProps} color="empty" icon={<IssueTypeIcon type={issue.type} />}>
          {`${issue.type}-${issue.id}`}
        </TypeButton>
      )}
      renderContent={() => (
        <TypeDropdown>
          <TypeTitle>Change issue type</TypeTitle>
          {Object.values(IssueType).map(type => (
            <Type key={type} onClick={() => updateIssue({ type })}>
              <IssueTypeIcon type={type} top={1} />
              <TypeLabel>{type}</TypeLabel>
            </Type>
          ))}
        </TypeDropdown>
      )}
    />
  );

  const renderFeedback = () => (
    <Tooltip
      width={300}
      offset={{ top: -15 }}
      renderLink={linkProps => (
        <Button icon="feedback" color="empty" {...linkProps}>
          Give feedback
        </Button>
      )}
      renderContent={() => (
        <FeedbackDropdown>
          <FeedbackImageCont>
            <FeedbackImage src={feedbackImage} alt="Give feedback" />
          </FeedbackImageCont>
          <FeedbackParagraph>
            This simplified Jira clone is built with React on the front-end and Node/TypeScript on
            the back-end.
          </FeedbackParagraph>
          <FeedbackParagraph>
            Read more on our website or reach out via <strong>ivor@codetree.co</strong>
          </FeedbackParagraph>
          <a href="https://codetree.co/" target="_blank" rel="noreferrer noopener">
            <Button color="primary">Visit Website</Button>
          </a>
        </FeedbackDropdown>
      )}
    />
  );

  const renderDeleteIcon = () => (
    <ConfirmModal
      title="Are you sure you want to delete this issue?"
      message="Once you delete, it's gone for good."
      confirmText="Delete issue"
      onConfirm={handleIssueDelete}
      renderLink={modal => <Button icon="trash" iconSize={19} color="empty" onClick={modal.open} />}
    />
  );

  return (
    <TopActions>
      {renderType()}
      <Right>
        {renderFeedback()}
        <CopyLinkButton color="empty" />
        {renderDeleteIcon()}
        <Button icon="close" iconSize={24} color="empty" onClick={modalClose} />
      </Right>
    </TopActions>
  );
};

ProjectBoardIssueDetailsTopActions.propTypes = propTypes;

export default ProjectBoardIssueDetailsTopActions;
