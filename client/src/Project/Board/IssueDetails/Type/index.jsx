import React from 'react';
import PropTypes from 'prop-types';

import { IssueType } from 'shared/constants/issues';
import { IssueTypeIcon, Tooltip } from 'shared/components';
import { TypeButton, TypeDropdown, TypeTitle, Type, TypeLabel } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsType = ({ issue, updateIssue }) => (
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

ProjectBoardIssueDetailsType.propTypes = propTypes;

export default ProjectBoardIssueDetailsType;
