import React from 'react';
import PropTypes from 'prop-types';
import { invert } from 'lodash';

import { IssuePriority } from 'shared/constants/issues';
import { Select, IssuePriorityIcon } from 'shared/components';
import { Priority, Option, Label } from './Styles';
import { SectionTitle } from '../Styles';

const IssuePriorityCopy = invert(IssuePriority);

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsPriority = ({ issue, updateIssue }) => {
  const renderPriorityItem = priority => (
    <Priority color={priority}>
      <IssuePriorityIcon priority={priority} />
      <Label>{IssuePriorityCopy[priority].toLowerCase()}</Label>
    </Priority>
  );
  return (
    <>
      <SectionTitle>Priority</SectionTitle>
      <Select
        value={issue.priority}
        options={Object.values(IssuePriority).map(priority => ({
          value: priority,
          label: IssuePriorityCopy[priority],
        }))}
        onChange={priority => updateIssue({ priority })}
        renderValue={({ value }) => renderPriorityItem(value)}
        renderOption={({ value, ...optionProps }) => (
          <Option {...optionProps}>{renderPriorityItem(value)}</Option>
        )}
      />
    </>
  );
};

ProjectBoardIssueDetailsPriority.propTypes = propTypes;

export default ProjectBoardIssueDetailsPriority;
