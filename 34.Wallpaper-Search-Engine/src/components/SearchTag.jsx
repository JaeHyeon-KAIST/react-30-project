import styled from 'styled-components';
import DeleteIcon from '../asset/delete.svg';
import React from 'react';

const Tag = styled.div`
  display: flex;
  font-size: 14px;
  border-radius: 16px;
  padding: 6px 10px;
  color: var(--primary);
  background-color: var(--highlight);
  cursor: pointer;
  &:hover {
    background-color: var(--overlay);
  }
  margin: 4px;
`;

const TagLabel = styled.span`
  margin-right: 4px;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const SearchTag = ({tag, searchTag, deleteTag}) => {
  const handleSearchTag = (e) => {
    e.target.id != 'deleteIcon' && searchTag(tag)
  }

  return (
    <Tag onClick={handleSearchTag}>
      <TagLabel>{tag}</TagLabel>
      <DeleteIcon id='deleteIcon' width="12px" onClick={deleteTag}/>
    </Tag>
  );
};

export default SearchTag;
