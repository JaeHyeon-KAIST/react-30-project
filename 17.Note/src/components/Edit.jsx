import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from './Button';
import Cookies from 'js-cookie';

const TitleInp = styled.input`
  
`;

const ContentInp = styled.textarea`
  height: 360px;
`;

const EditContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const Edit = ({setMode, memoIdx}) => {
  const [title, setTitle] = useState(() => {
    if (Number.isInteger(memoIdx)) {
      const memoList = JSON.parse(Cookies.get('memo') ?? null) ?? [];
      return memoList[memoIdx].title;
    }
    return '';
  });
  const [contents, setContents] = useState(() => {
    if (Number.isInteger(memoIdx)) {
      const memoList = JSON.parse(Cookies.get('memo') ?? null) ?? [];
      return memoList[memoIdx].contents;
    }
    return '';
  });

  return <>
    <EditContainer>
      <TitleInp value={title} onChange={(event) => setTitle(event.currentTarget.value)}/>
      <ContentInp value={contents} onChange={(event) => setContents(event.currentTarget.value)}/>
      <ButtonContainer>
        <Button onClick={() => setMode("view")}>뒤로가기</Button>
        <Button onClick={() => {
          if (!title.length || !contents.length) {
            alert("제목과 내용을 적어주세요");
            return;
          }

          const memoList = JSON.parse(Cookies.get('memo') ?? null) ?? [];

          if (Number.isInteger(memoIdx)) {
            memoList[memoIdx] = {
              title,
              contents
            }
          } else {
            memoList.push({
              title,
              contents
            })
          }

          Cookies.set('memo', JSON.stringify(memoList));
          alert("저장되었습니다");
          setMode("view");
        }}>저장</Button>
      </ButtonContainer>
    </EditContainer>
  </>
}

export default Edit;