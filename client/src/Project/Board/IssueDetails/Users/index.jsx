import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Select, Icon } from 'shared/components';
import { User, Username } from './Styles';
import { SectionTitle } from '../Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardIssueDetailsUsers = ({ issue, updateIssue, projectUsers }) => {
  const getUserById = userId => projectUsers.find(user => user.id === userId);

  const userOptions = projectUsers.map(user => ({ value: user.id, label: user.name }));

  const renderUserValue = (user, withBottomMargin, removeOptionValue) => (
    <User
      key={user.id}
      isSelectValue
      withBottomMargin={withBottomMargin}
      onClick={() => removeOptionValue && removeOptionValue(user.id)}
    >
      <Avatar avatarUrl={user.avatarUrl} name={user.name} size={24} />
      <Username>{user.name}</Username>
      {removeOptionValue && <Icon type="close" top={1} />}
    </User>
  );

  const renderUserOption = user => (
    <User key={user.id}>
      <Avatar avatarUrl={user.avatarUrl} name={user.name} size={32} />
      <Username>{user.name}</Username>
    </User>
  );

  const renderAssignees = () => (
    <>
      <SectionTitle>Assignees</SectionTitle>
      <Select
        isMulti
        dropdownWidth={343}
        placeholder="Unassigned"
        value={issue.userIds}
        options={userOptions}
        onChange={userIds => {
          updateIssue({ userIds, users: userIds.map(getUserById) });
        }}
        renderValue={({ value, removeOptionValue }) =>
          renderUserValue(getUserById(value), true, removeOptionValue)
        }
        renderOption={({ value }) => renderUserOption(getUserById(value))}
      />
    </>
  );

  const renderReporter = () => (
    <>
      <SectionTitle>Reporter</SectionTitle>
      <Select
        dropdownWidth={343}
        value={issue.reporterId}
        options={userOptions}
        onChange={userId => updateIssue({ reporterId: userId })}
        renderValue={({ value }) => renderUserValue(getUserById(value), false)}
        renderOption={({ value }) => renderUserOption(getUserById(value))}
      />
    </>
  );

  return (
    <>
      {renderAssignees()}
      {renderReporter()}
    </>
  );
};

ProjectBoardIssueDetailsUsers.propTypes = propTypes;

export default ProjectBoardIssueDetailsUsers;
