import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Card from './components/Card';
import Edit from './components/Edit';
import Cookies from 'js-cookie';

const CardContainer = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  align-items: center;
`;

const PlusCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  border: 1px solid #707070;
  width: 80px;
  height: 80px;
  padding-bottom: 8px;
  box-sizing: border-box;
  cursor: pointer;
  margin: 80px;
`;

function App() {
  const [mode, setMode] = useState('view');
  const [memoList, setMemoList] = useState([]);
  const [selectedMemoIdx, setSelectedMemoIdx] = useState();

  useEffect(() => {
    const memoList = JSON.parse(Cookies.get('memo') ?? null) ?? [];
    setMemoList(memoList);
  }, [mode]);

  return (
    <>
      {
        mode == "view" &&
          <CardContainer>
            {
              memoList.map((memo, idx) => <Card
                key={idx}
                title={memo.title}
                onClick={() => {
                  setSelectedMemoIdx(idx);
                  setMode('edit');
                }}
              />)
            }
            <PlusCard onClick={() => {
              setSelectedMemoIdx(null);
              setMode('edit');
              }}>+</PlusCard>
            <PlusCard onClick={() => {
              setSelectedMemoIdx(null);
              setMemoList([]);
              Cookies.remove('memo');
              }}>C</PlusCard>
          </CardContainer>
      }
      {
        mode == "edit" && <Edit setMode={setMode} memoIdx={selectedMemoIdx}/>
      }
    </>
  );
}

export default App;