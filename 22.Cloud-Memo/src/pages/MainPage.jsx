import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Editer from '../components/Editer'
import Box from '../components/Box'
import Button from '../components/Button'
import Flex from '../components/Flex'
import axios from 'axios'

function MainPage() {
  const navigate = useNavigate()

  const [edit, setEdit] = useState("")
  const [memoList, setMemoList] = useState([])

  useEffect(() => {
    (async () => {
      const {data: {rs}} = await axios.get("/tmp")

      setEdit(rs)
    })()

    loadMemo()
  }, [])

  useEffect(() => {
    if (edit.length > 0) {
      axios.post("/tmp", {
        content: edit
      })
    }
  }, [edit])

  const handleSubmit = useCallback(async () => {
    if (edit.replace(/<[/\w\s"=-]*>/gi, "").length === 0) {
      alert("메모가 비어있습니다")
      return;
    }
    try {
      const {data} = await axios.post('/', {
        content: edit
      })

      setMemoList(prev => [...prev, data])
      // await loadMemo()
      setEdit("")
      alert("제출 완료!")
    } catch(e) {
      alert("저장 실패")
    }
  }, [edit])

  const loadMemo = useCallback(async () => {
    const {data} = await axios.get('/')
    setMemoList(data)
  }, [setMemoList])

  return (
    <Box p="16px">
      <h1>클라우드 메모장</h1>
      <Editer value={edit} onChange={setEdit} />
      <Flex justifyContent={"flex-end"} style={{gap: 8}}>
        <Button mt="8px" onClick={handleSubmit}>
          제출
        </Button>
        <Button mt="8px" onClick={() => navigate("/manager")}>
          관리자
        </Button>
      </Flex>
      {
        memoList.map(value => (
          <Flex onClick={() => navigate('/' + value.id)} style={{cursor: "pointer"}} border={"#ccc solid 1px"} my={"8px"} p={"16px"} key={value.created_at} flexDirection={"column"}>
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
  );
}

export default MainPage