import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Editer from '../components/Editer'
import Box from '../components/Box'
import Button from '../components/Button'
import Flex from '../components/Flex'
import axios from 'axios'

function MemoEditPage() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [edit, setEdit] = useState(null)

  const handleSubmit = useCallback(async () => {
    try {
      await axios.put("/" + id, {
        content: edit
      })
      alert("수정을 성공했습니다")
      navigate('/' + id)
    } catch(e) {
      alert(e.response.data.msg)
      navigate("/")
    }
  }, [edit, id])

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('/' + id)
        setEdit(data.content)
      } catch(e) {
        alert(e.response.data.msg)
        navigate("/")
      }
    })()
  }, [])

  if(edit === null) return <></>

  return (
    <Box p="16px">
      <h1>
        {id} 메모 수정
      </h1>
      <Editer value={edit} onChange={setEdit} />
      <Flex justifyContent={"flex-end"} style={{gap: "8px"}}>
        <Button mt="8px" onClick={handleSubmit}>
          수정
        </Button>
        <Button mt="8px" onClick={() => navigate("/" + id)}>
          취소
        </Button>
      </Flex>
    </Box>
  )
}

export default MemoEditPage