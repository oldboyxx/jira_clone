import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { IssuePriority, IssuePriorityCopy } from 'shared/constants/issues';
import { Select, IssuePriorityIcon } from 'shared/components';

import { SectionTitle } from '../Styles';
import { Priority, Label } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsPriority = ({ issue, updateIssue }) => (
  <Fragment>
    <SectionTitle>Priority</SectionTitle>
    <Select
      variant="empty"
      withClearValue={false}
      dropdownWidth={343}
      name="priority"
      value={issue.priority}
      options={Object.values(IssuePriority).map(priority => ({
        value: priority,
        label: IssuePriorityCopy[priority],
      }))}
      onChange={priority => updateIssue({ priority })}
      renderValue={({ value: priority }) => renderPriorityItem(priority, true)}
      renderOption={({ value: priority }) => renderPriorityItem(priority)}
    />
  </Fragment>
);

const renderPriorityItem = (priority, isValue) => (
  <Priority isValue={isValue}>
    <IssuePriorityIcon priority={priority} />
    <Label>{IssuePriorityCopy[priority]}</Label>
  </Priority>
);

ProjectBoardIssueDetailsPriority.propTypes = propTypes;

export default ProjectBoardIssueDetailsPriority;
