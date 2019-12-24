import React from 'react';
import PropTypes from 'prop-types';

import {
  IssueType,
  IssueStatus,
  IssuePriority,
  IssueTypeCopy,
  IssuePriorityCopy,
} from 'shared/constants/issues';
import toast from 'shared/utils/toast';
import useApi from 'shared/hooks/api';
import { Form, IssueTypeIcon, Icon, Avatar, IssuePriorityIcon } from 'shared/components';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectIssueCreateForm = ({ project, fetchProject, modalClose }) => {
  const [{ isCreating }, createIssue] = useApi.post('/issues');

  const typeOptions = Object.values(IssueType).map(type => ({
    value: type,
    label: IssueTypeCopy[type],
  }));

  const priorityOptions = Object.values(IssuePriority).map(priority => ({
    value: priority,
    label: IssuePriorityCopy[priority],
  }));

  const userOptions = project.users.map(user => ({ value: user.id, label: user.name }));

  const renderType = ({ value: type }) => (
    <SelectItem>
      <IssueTypeIcon type={type} top={1} />
      <SelectItemLabel>{IssueTypeCopy[type]}</SelectItemLabel>
    </SelectItem>
  );

  const renderPriority = ({ value: priority }) => (
    <SelectItem>
      <IssuePriorityIcon priority={priority} top={1} />
      <SelectItemLabel>{IssuePriorityCopy[priority]}</SelectItemLabel>
    </SelectItem>
  );

  const renderUser = ({ value: userId, removeOptionValue }) => {
    const user = project.users.find(({ id }) => id === userId);
    return (
      <SelectItem
        key={user.id}
        withBottomMargin={!!removeOptionValue}
        onClick={() => removeOptionValue && removeOptionValue()}
      >
        <Avatar size={20} avatarUrl={user.avatarUrl} name={user.name} />
        <SelectItemLabel>{user.name}</SelectItemLabel>
        {removeOptionValue && <Icon type="close" top={2} />}
      </SelectItem>
    );
  };

  return (
    <Form
      initialValues={{
        status: IssueStatus.BACKLOG,
        type: IssueType.TASK,
        title: '',
        description: '',
        reporterId: null,
        userIds: [],
        priority: null,
      }}
      validations={{
        type: Form.is.required(),
        title: [Form.is.required(), Form.is.maxLength(200)],
        reporterId: Form.is.required(),
        priority: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createIssue({
            ...values,
            projectId: project.id,
            users: values.userIds.map(id => ({ id })),
          });
          await fetchProject();
          modalClose();
        } catch (error) {
          if (error.data.fields) {
            form.setErrors(error.data.fields);
          } else {
            toast.error(error);
          }
        }
      }}
    >
      <FormElement>
        <FormHeading>Create issue</FormHeading>
        <Form.Field.Select
          name="type"
          label="Issue Type"
          tip="Start typing to get a list of possible matches."
          options={typeOptions}
          renderOption={renderType}
          renderValue={renderType}
        />
        <Divider />
        <Form.Field.Input
          name="title"
          label="Short Summary"
          tip="Concisely summarize the issue in one or two sentences."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Select
          name="reporterId"
          label="Reporter"
          options={userOptions}
          renderOption={renderUser}
          renderValue={renderUser}
        />
        <Form.Field.Select
          isMulti
          name="userIds"
          label="Assignees"
          tio="People who are responsible for dealing with this issue."
          options={userOptions}
          renderOption={renderUser}
          renderValue={renderUser}
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          tip="Priority in relation to other issues."
          options={priorityOptions}
          renderOption={renderPriority}
          renderValue={renderPriority}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" working={isCreating}>
            Create Issue
          </ActionButton>
          <ActionButton variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

ProjectIssueCreateForm.propTypes = propTypes;

export default ProjectIssueCreateForm;
