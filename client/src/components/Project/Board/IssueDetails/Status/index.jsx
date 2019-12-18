import React from 'react';
import PropTypes from 'prop-types';

import { IssueStatus, IssueStatusCopy } from 'shared/constants/issues';
import { Select } from 'shared/components';
import { Status, Option } from './Styles';
import { SectionTitle } from '../Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsStatus = ({ issue, updateIssue }) => (
  <>
    <SectionTitle>Status</SectionTitle>
    <Select
      value={issue.status}
      options={Object.values(IssueStatus).map(status => ({
        value: status,
        label: IssueStatusCopy[status],
      }))}
      onChange={status => updateIssue({ status })}
      renderValue={({ value: status }) => (
        <Status isLarge color={status}>
          {IssueStatusCopy[status]}
        </Status>
      )}
      renderOption={({ value: status, ...optionProps }) => (
        <Option {...optionProps}>
          <Status color={status}>{IssueStatusCopy[status]}</Status>
        </Option>
      )}
    />
  </>
);

ProjectBoardIssueDetailsStatus.propTypes = propTypes;

export default ProjectBoardIssueDetailsStatus;
