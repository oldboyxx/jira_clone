import React from 'react';
import PropTypes from 'prop-types';

import { IssuePriority, IssuePriorityCopy } from 'shared/constants/issues';
import { Select, IssuePriorityIcon } from 'shared/components';
import { Priority, Label } from './Styles';
import { SectionTitle } from '../Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsPriority = ({ issue, updateIssue }) => {
  const renderPriorityItem = (priority, isValue) => (
    <Priority isValue={isValue}>
      <IssuePriorityIcon priority={priority} />
      <Label>{IssuePriorityCopy[priority]}</Label>
    </Priority>
  );
  return (
    <>
      <SectionTitle>Priority</SectionTitle>
      <Select
        variant="empty"
        dropdownWidth={343}
        value={issue.priority}
        options={Object.values(IssuePriority).map(priority => ({
          value: priority,
          label: IssuePriorityCopy[priority],
        }))}
        onChange={priority => updateIssue({ priority })}
        renderValue={({ value }) => renderPriorityItem(value, true)}
        renderOption={({ value }) => renderPriorityItem(value)}
      />
    </>
  );
};

ProjectBoardIssueDetailsPriority.propTypes = propTypes;

export default ProjectBoardIssueDetailsPriority;
