import React from 'react';
import PropTypes from 'prop-types';
import { invert, isNil } from 'lodash';

import { IssueStatus, IssueStatusCopy, IssuePriority } from 'shared/constants/issues';
import {
  Avatar,
  Select,
  Icon,
  InputDebounced,
  IssuePriorityIcon,
  Modal,
  Button,
} from 'shared/components';
import {
  SectionTitle,
  User,
  UserName,
  Status,
  StatusOption,
  UserOptionCont,
  Priority,
  PriorityOption,
  PriorityLabel,
  Tracking,
  TrackingIcon,
  TrackingRight,
  TrackingBarCont,
  TrackingBar,
  TrackingValues,
  TrackingModalContents,
  TrackingModalTitle,
  Inputs,
  InputCont,
  InputLabel,
  Actions,
} from './Styles';

const IssuePriorityCopy = invert(IssuePriority);

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired,
};

const ProjectBoardIssueDetailsRightActions = ({ issue, updateIssue, projectUsers }) => {
  const getUserById = userId => projectUsers.find(user => user.id === parseInt(userId));

  const userOptions = projectUsers.map(user => ({ value: user.id, label: user.name }));

  const renderHourInput = fieldName => (
    <InputDebounced
      placeholder="Number"
      filter={/^\d{0,6}$/}
      value={isNil(issue[fieldName]) ? '' : issue[fieldName]}
      onChange={stringValue => {
        const value = stringValue.trim() ? parseInt(stringValue) : null;
        updateIssue({ [fieldName]: value });
      }}
    />
  );

  const renderStatus = () => (
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
          <StatusOption {...optionProps}>
            <Status color={status}>{IssueStatusCopy[status]}</Status>
          </StatusOption>
        )}
      />
    </>
  );

  const renderUserValue = (user, withBottomMargin, removeOptionValue) => (
    <User
      key={user.id}
      isSelectValue
      withBottomMargin={withBottomMargin}
      onClick={() => removeOptionValue && removeOptionValue(user.id)}
    >
      <Avatar avatarUrl={user.avatarUrl} name={user.name} size={24} />
      <UserName>{user.name}</UserName>
      {removeOptionValue && <Icon type="close" top={1} />}
    </User>
  );

  const renderUserOption = user => (
    <User key={user.id}>
      <Avatar avatarUrl={user.avatarUrl} name={user.name} size={32} />
      <UserName>{user.name}</UserName>
    </User>
  );

  const renderAssignees = () => (
    <>
      <SectionTitle>Assignees</SectionTitle>
      <Select
        isMulti
        placeholder="Unassigned"
        value={issue.userIds}
        options={userOptions}
        onChange={userIds => {
          updateIssue({ userIds, users: userIds.map(getUserById) });
        }}
        renderValue={({ value, removeOptionValue }) =>
          renderUserValue(getUserById(value), true, removeOptionValue)
        }
        renderOption={({ value, ...optionProps }) => (
          <UserOptionCont {...optionProps}>{renderUserOption(getUserById(value))}</UserOptionCont>
        )}
      />
    </>
  );

  const renderReporter = () => (
    <>
      <SectionTitle>Reporter</SectionTitle>
      <Select
        value={issue.reporterId}
        options={userOptions}
        onChange={userId => updateIssue({ reporterId: userId })}
        renderValue={({ value }) => renderUserValue(getUserById(value), false)}
        renderOption={({ value, ...optionProps }) => (
          <UserOptionCont {...optionProps}>{renderUserOption(getUserById(value))}</UserOptionCont>
        )}
      />
    </>
  );

  const renderEstimate = () => (
    <>
      <SectionTitle>Original Estimate (hours)</SectionTitle>
      {renderHourInput('estimate')}
    </>
  );

  const renderPriorityItem = priority => (
    <Priority color={priority}>
      <IssuePriorityIcon priority={priority} />
      <PriorityLabel>{IssuePriorityCopy[priority].toLowerCase()}</PriorityLabel>
    </Priority>
  );

  const renderPriority = () => (
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
          <PriorityOption {...optionProps}>{renderPriorityItem(value)}</PriorityOption>
        )}
      />
    </>
  );

  const calculateTrackingBarWidth = () => {
    const { timeSpent, timeRemaining, estimate } = issue;

    if (!timeSpent) {
      return 0;
    }
    if (isNil(timeRemaining) && isNil(estimate)) {
      return 100;
    }
    if (!isNil(timeRemaining)) {
      return (timeSpent / (timeSpent + timeRemaining)) * 100;
    }
    if (!isNil(estimate)) {
      return Math.min((timeSpent / estimate) * 100, 100);
    }
  };

  const renderRemainingOrEstimate = () => {
    const { timeRemaining, estimate } = issue;

    if (isNil(timeRemaining) && isNil(estimate)) {
      return null;
    }
    if (!isNil(timeRemaining)) {
      return <div>{`${timeRemaining}h remaining`}</div>;
    }
    if (!isNil(estimate)) {
      return <div>{`${estimate}h estimated`}</div>;
    }
  };

  const renderTrackingPreview = (onClick = () => {}) => (
    <Tracking onClick={onClick}>
      <TrackingIcon type="stopwatch" size={26} top={-1} />
      <TrackingRight>
        <TrackingBarCont>
          <TrackingBar width={calculateTrackingBarWidth()} />
        </TrackingBarCont>
        <TrackingValues>
          <div>{issue.timeSpent ? `${issue.timeSpent}h logged` : 'No time logged'}</div>
          {renderRemainingOrEstimate()}
        </TrackingValues>
      </TrackingRight>
    </Tracking>
  );

  const renderTracking = () => (
    <>
      <SectionTitle>Time Tracking</SectionTitle>
      <Modal
        width={400}
        renderLink={modal => renderTrackingPreview(modal.open)}
        renderContent={modal => (
          <TrackingModalContents>
            <TrackingModalTitle>Time tracking</TrackingModalTitle>
            {renderTrackingPreview()}
            <Inputs>
              <InputCont>
                <InputLabel>Time spent (hours)</InputLabel>
                {renderHourInput('timeSpent')}
              </InputCont>
              <InputCont>
                <InputLabel>Time remaining (hours)</InputLabel>
                {renderHourInput('timeRemaining')}
              </InputCont>
            </Inputs>
            <Actions>
              <Button color="primary" onClick={modal.close}>
                Close
              </Button>
            </Actions>
          </TrackingModalContents>
        )}
      />
    </>
  );

  return (
    <>
      {renderStatus()}
      {renderAssignees()}
      {renderReporter()}
      {renderEstimate()}
      {renderPriority()}
      {renderTracking()}
    </>
  );
};

ProjectBoardIssueDetailsRightActions.propTypes = propTypes;

export default ProjectBoardIssueDetailsRightActions;
