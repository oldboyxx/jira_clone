import React, { useState } from 'react';
import PropTypes from 'prop-types';

import api from 'shared/utils/api';
import useApi from 'shared/hooks/api';
import toast from 'shared/utils/toast';
import BodyForm from '../BodyForm';
import { Create, UserAvatar, Right, FakeTextarea, Tip, TipLetter } from './Style';

const propTypes = {
  issueId: PropTypes.number.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsCommentsCreate = ({ issueId, fetchIssue }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [body, setBody] = useState('');

  const [{ data: currentUserData }] = useApi.get('/currentUser');
  const currentUser = currentUserData && currentUserData.currentUser;

  const handleCommentCreate = async () => {
    try {
      setCreating(true);
      await api.post(`/comments`, { body, issueId, userId: currentUser.id });
      await fetchIssue();
      setFormOpen(false);
      setCreating(false);
      setBody('');
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <Create>
      {currentUser && <UserAvatar name={currentUser.name} avatarUrl={currentUser.avatarUrl} />}
      <Right>
        {isFormOpen ? (
          <BodyForm
            value={body}
            onChange={setBody}
            isWorking={isCreating}
            onSubmit={handleCommentCreate}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <>
            <FakeTextarea onClick={() => setFormOpen(true)}>Add a comment...</FakeTextarea>
            <Tip>
              <strong>Pro tip:</strong>press<TipLetter>M</TipLetter>to comment
            </Tip>
          </>
        )}
      </Right>
    </Create>
  );
};

ProjectBoardIssueDetailsCommentsCreate.propTypes = propTypes;

export default ProjectBoardIssueDetailsCommentsCreate;
