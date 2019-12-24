import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Select, Icon } from 'shared/components';

import { SectionTitle } from '../Styles';
import { User, Username } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardIssueDetailsUsers = ({ issue, updateIssue, projectUsers }) => {
  const getUserById = userId => projectUsers.find(user => user.id === userId);

  const userOptions = projectUsers.map(user => ({ value: user.id, label: user.name }));

  const renderUser = (user, isSelectValue, removeOptionValue) => (
    <User
      key={user.id}
      isSelectValue={isSelectValue}
      withBottomMargin={!!removeOptionValue}
      onClick={() => removeOptionValue && removeOptionValue()}
    >
      <Avatar avatarUrl={user.avatarUrl} name={user.name} size={24} />
      <Username>{user.name}</Username>
      {removeOptionValue && <Icon type="close" top={1} />}
    </User>
  );

  const renderAssignees = () => (
    <>
      <SectionTitle>Assignees</SectionTitle>
      <Select
        isMulti
        variant="empty"
        dropdownWidth={343}
        placeholder="Unassigned"
        value={issue.userIds}
        options={userOptions}
        onChange={userIds => {
          updateIssue({ userIds, users: userIds.map(getUserById) });
        }}
        renderValue={({ value, removeOptionValue }) =>
          renderUser(getUserById(value), true, removeOptionValue)
        }
        renderOption={({ value }) => renderUser(getUserById(value), false)}
      />
    </>
  );

  const renderReporter = () => (
    <>
      <SectionTitle>Reporter</SectionTitle>
      <Select
        variant="empty"
        dropdownWidth={343}
        value={issue.reporterId}
        options={userOptions}
        onChange={userId => updateIssue({ reporterId: userId })}
        renderValue={({ value }) => renderUser(getUserById(value), true)}
        renderOption={({ value }) => renderUser(getUserById(value))}
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
