import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../asset/search.svg';
import SearchTag from './SearchTag';
import SearchOption from './SearchOption';

const SearchTagContainer = styled.div`
  display: flex;
  width: 100%;
  overflow: auto;
  justify-content: center;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  padding: 4px 16px;
  width: 100%;
  align-items: center;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const SearchInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const SearchInput = styled.input`
  background: transparent;
  font-size: 16px;
  outline: none;
  color: #5e5e5e;
  border: none;
  flex: auto;
  margin-left: 8px;
`;

const SearchOptionButton = styled.p`
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  color: #5e5e5e;
`;

const Search = ({setQuery, setOrientation, setOrder, setPerPage}) => {
  const [searchOption, setSearchOption] = useState(false);
  const [searchTags, setSearchTags] = useState(JSON.parse(localStorage.getItem('searchTags')) ?? [])

  const inputRef = useRef()

  const updateSearchInput = (value) => {
    inputRef.current.value = value
  }

  const toggleSearchOption = () => {
    setSearchOption((prev) => !prev);
  };

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const currentValue = e.target.value
      setQuery(currentValue)
      updateSearchInput('')
      if (!searchTags.includes(currentValue)) {
        setSearchTags(prev => [...prev, currentValue])
      }
    }
  }

  const searchTag = (tag) => {
    setQuery(tag)
    updateSearchInput(tag)
  }

  const deleteTag = (idx) => {
    const newSerachTags = [...searchTags]
    newSerachTags.splice(idx, 1)
    setSearchTags(newSerachTags)
  }

  useEffect(() => {
    localStorage.setItem('searchTags', JSON.stringify(searchTags))
  }, [searchTags])

  return (
    <>
      <SearchBoxContainer>
        <SearchInputContainer>
          <SearchIcon width="24" fill="#5e5e5e" />
          <SearchInput
            ref={inputRef}
            placeholder="????????? ?????? ??? ENTER"
            onKeyDown={onSearch}
          />
          <SearchOptionButton onClick={toggleSearchOption}>
            ?????? ?????? {searchOption ? '??????' : '??????'}
          </SearchOptionButton>
        </SearchInputContainer>
        <div hidden={!searchOption}>
          <SearchOption setOrientation={setOrientation} setOrder={setOrder} setPerPage={setPerPage} />
        </div>
      </SearchBoxContainer>
      <SearchTagContainer>
        {searchTags.map((tag, idx) => (
          <SearchTag key={tag + idx} tag={tag} searchTag={searchTag} deleteTag={() => deleteTag(idx)}/>
        ))}
      </SearchTagContainer>
    </>
  );
};

export default Search;
