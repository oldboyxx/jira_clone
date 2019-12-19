import React from 'react';
import PropTypes from 'prop-types';

import { IssueStatus, IssueStatusCopy } from 'shared/constants/issues';
import { Select, Icon } from 'shared/components';
import { Status } from './Styles';
import { SectionTitle } from '../Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsStatus = ({ issue, updateIssue }) => (
  <>
    <SectionTitle>Status</SectionTitle>
    <Select
      dropdownWidth={343}
      value={issue.status}
      options={Object.values(IssueStatus).map(status => ({
        value: status,
        label: IssueStatusCopy[status],
      }))}
      onChange={status => updateIssue({ status })}
      renderValue={({ value: status }) => (
        <Status isValue color={status}>
          <div>{IssueStatusCopy[status]}</div>
          <Icon type="chevron-down" size={18} />
        </Status>
      )}
      renderOption={({ value: status }) => (
        <Status color={status}>{IssueStatusCopy[status]}</Status>
      )}
    />
  </>
);

ProjectBoardIssueDetailsStatus.propTypes = propTypes;

export default ProjectBoardIssueDetailsStatus;
