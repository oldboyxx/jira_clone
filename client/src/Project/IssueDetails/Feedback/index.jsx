import React from 'react';

import { Button, Tooltip } from 'shared/components';
import feedbackImage from './assets/feedback.png';
import { FeedbackDropdown, FeedbackImageCont, FeedbackImage, FeedbackParagraph } from './Styles';

const ProjectBoardIssueDetailsFeedback = () => (
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
          This simplified Jira clone is built with React on the front-end and Node/TypeScript on the
          back-end.
        </FeedbackParagraph>
        <FeedbackParagraph>
          {'Read more on our website or reach out via '}
          <a href="mailto:ivor@codetree.co">
            <strong>ivor@codetree.co</strong>
          </a>
        </FeedbackParagraph>
        <a href="https://codetree.co/" target="_blank" rel="noreferrer noopener">
          <Button color="primary">Visit Website</Button>
        </a>
        <a href="https://github.com/oldboyxx/jira_clone" target="_blank" rel="noreferrer noopener">
          <Button style={{ marginLeft: 10 }} icon="github">
            Github Repo
          </Button>
        </a>
      </FeedbackDropdown>
    )}
  />
);

export default ProjectBoardIssueDetailsFeedback;
