import React, { memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '../components/Box'
import Button from '../components/Button'
import Flex from '../components/Flex'
import axios from 'axios'
import { VscChevronLeft, VscEdit, VscTrash } from 'react-icons/vsc'

function MemoMangerPage() {
  const navigate = useNavigate()

  const [memoList, setMemoList] = useState([])
  const [selectedMemoList, setSelectedMemoList] = useState([])

  useEffect(() => {
    loadMemo()
  }, [])

  const loadMemo = useCallback(async () => {
    const {data} = await axios.get('/')
    setMemoList(data)
  }, [setMemoList])

  return (
    <Box p="16px">
      <Button square onClick={() => navigate("/")}>
        <VscChevronLeft/>
      </Button>
      <h1>클라우드 메모장 매니저</h1>
      <Flex style={{gap: 8}}>
        <Button onClick={() => setSelectedMemoList(memoList.length === selectedMemoList.length ? [] : memoList.map(v => v.id))}>
          {
            memoList.length === selectedMemoList.length ? "전체 해제" : "전체 선택"
          }
        </Button>
        <Button onClick={async () => {
          if (selectedMemoList.length === 0) {
            alert("메모를 선택해주세요")
            return;
          }

          const list = []

          for (const id of selectedMemoList) {
            list.push(axios.delete("/" + id))
          }

          await Promise.all(list)

          await loadMemo()
          alert("제거 완료!")
        }}>
          선택 제거
        </Button>
        <Button onClick={async () => {
          if (!confirm("정말로 전체 제거를 하시겠습니까?")) {
            return;
          }

          axios.delete("/")

          await loadMemo()
          alert("제거 완료!")
        }}>
          전체 제거
        </Button>
      </Flex>
      {
        memoList.map(value => (
          <Flex
          onClick={() => setSelectedMemoList(prev => prev.includes(value.id) ? prev.filter(v => value.id !== v) : [...prev, value.id])}
          style={{cursor: "pointer"}}
          border={"#ccc solid 1px"}
          borderWidth={selectedMemoList.includes(value.id) ? "5px" : "1px"}
          my={"8px"}
          p={"16px"}
          key={value.created_at}
          flexDirection={"column"}>
            <Box className="memo-content" dangerouslySetInnerHTML={{__html:value.content}} />
            <Box textAlign={"right"} fontSize={"12px"} color={"#555"}>생성: {new Date(value.created_at).toLocaleString()}</Box>
            {
              value.updated_at !== null &&
                <Box textAlign={"right"} fontSize={"12px"} color={"#555"}>수정: {new Date(value.updated_at).toLocaleString()}</Box>
            }
          </Flex>
        ))
      }
    </Box>
  )
}

export default MemoMangerPage