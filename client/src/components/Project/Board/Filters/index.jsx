import React from 'react';
import PropTypes from 'prop-types';
import { xor } from 'lodash';

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
  projectUsers: PropTypes.array.isRequired,
  defaultFilters: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

const ProjectBoardFilters = ({ projectUsers, defaultFilters, filters, setFilters }) => {
  const { searchQuery, userIds, myOnly, recent } = filters;

  const setFiltersMerge = newFilters => setFilters({ ...filters, ...newFilters });

  const areFiltersCleared = !searchQuery && userIds.length === 0 && !myOnly && !recent;

  return (
    <Filters>
      <SearchInput
        icon="search"
        value={searchQuery}
        onChange={value => setFiltersMerge({ searchQuery: value })}
      />
      <Avatars>
        {projectUsers.map(user => (
          <AvatarIsActiveBorder key={user.id} isActive={userIds.includes(user.id)}>
            <StyledAvatar
              avatarUrl={user.avatarUrl}
              name={user.name}
              onClick={() => setFiltersMerge({ userIds: xor(userIds, [user.id]) })}
            />
          </AvatarIsActiveBorder>
        ))}
      </Avatars>
      <StyledButton
        color="empty"
        isActive={myOnly}
        onClick={() => setFiltersMerge({ myOnly: !myOnly })}
      >
        Only My Issues
      </StyledButton>
      <StyledButton
        color="empty"
        isActive={recent}
        onClick={() => setFiltersMerge({ recent: !recent })}
      >
        Recently Updated
      </StyledButton>
      {!areFiltersCleared && (
        <ClearAll onClick={() => setFilters(defaultFilters)}>Clear all</ClearAll>
      )}
    </Filters>
  );
};

ProjectBoardFilters.propTypes = propTypes;

export default ProjectBoardFilters;
