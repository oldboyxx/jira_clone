import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { intersection, xor } from 'lodash';

import useDebounceValue from 'shared/hooks/debounceValue';
import {
  Filters,
  SearchInput,
  Avatars,
  AvatarIsActiveBorder,
  StyledAvatar,
  StyledButton,
  ClearAll,
} from './Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ProjectBoardFilters = ({ project, currentUser, onChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userIds, setUserIds] = useState([]);
  const [myOnly, setMyOnly] = useState(false);
  const [recent, setRecent] = useState(false);
  const debouncedSearchQuery = useDebounceValue(searchQuery, 500);

  const clearFilters = () => {
    setSearchQuery('');
    setUserIds([]);
    setMyOnly(false);
    setRecent(false);
  };

  const areFiltersCleared = !searchQuery && userIds.length === 0 && !myOnly && !recent;

  useEffect(() => {
    const getFilteredIssues = () => {
      let { issues } = project;

      if (debouncedSearchQuery) {
        issues = issues.filter(issue =>
          issue.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
        );
      }
      if (userIds.length > 0) {
        issues = issues.filter(issue => intersection(issue.userIds, userIds).length > 0);
      }
      if (myOnly) {
        issues = issues.filter(issue => issue.userIds.includes(currentUser.id));
      }
      if (recent) {
        issues = issues.filter(issue =>
          moment(issue.updatedAt).isAfter(moment().subtract(3, 'days')),
        );
      }
      return issues;
    };
    onChange(getFilteredIssues());
  }, [project, currentUser, onChange, debouncedSearchQuery, userIds, myOnly, recent]);

  return (
    <Filters>
      <SearchInput icon="search" value={searchQuery} onChange={setSearchQuery} />
      <Avatars>
        {project.users.map(user => (
          <AvatarIsActiveBorder key={user.id} isActive={userIds.includes(user.id)}>
            <StyledAvatar
              avatarUrl={user.avatarUrl}
              name={user.name}
              onClick={() => setUserIds(value => xor(value, [user.id]))}
            />
          </AvatarIsActiveBorder>
        ))}
      </Avatars>
      <StyledButton color="empty" isActive={myOnly} onClick={() => setMyOnly(!myOnly)}>
        Only My Issues
      </StyledButton>
      <StyledButton color="empty" isActive={recent} onClick={() => setRecent(!recent)}>
        Recently Updated
      </StyledButton>
      {!areFiltersCleared && <ClearAll onClick={clearFilters}>Clear all</ClearAll>}
    </Filters>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
