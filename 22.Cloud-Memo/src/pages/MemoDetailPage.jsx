import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Box from '../components/Box'
import Button from '../components/Button'
import Flex from '../components/Flex'
import { VscChevronLeft, VscCopy, VscEdit, VscLiveShare, VscTrash } from 'react-icons/vsc'
import {CopyToClipboard} from 'react-copy-to-clipboard'

function MemoDetailPage() {
  const {id} = useParams()
  const navigate = useNavigate()

  const [memo, setMemo] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const {data} = await axios.get('/' + id)
  
        console.log(data)
        setMemo(data)
      } catch(e) {
        alert(e.response.data.msg)
        navigate("/")
      }
    })()
  }, [])

  if (memo === null) return <></>

  return (
    <>
      <Box p={"16px"}>
        <Button square onClick={() => navigate("/")}>
          <VscChevronLeft/>
        </Button>
        <Flex border={"#ccc solid 1px"} my={"8px"} p={"16px"} flexDirection={"column"}>
          <Box className="memo-content" dangerouslySetInnerHTML={{__html:memo.content}} />
          <Box textAlign={"right"} fontSize={"12px"} color={"#555"}>생성: {new Date(memo.created_at).toLocaleString()}</Box>
          {
            memo.updated_at !== null &&
              <Box textAlign={"right"} fontSize={"12px"} color={"#555"}>수정: {new Date(memo.updated_at).toLocaleString()}</Box>
          }
        </Flex>
        <Flex justifyContent={"flex-end"} style={{gap: 8}}>
          <Button square onClick={() => {
            window.navigator.share({
              title: "클라우드 메모 공유",
              text: memo.content,
              url: window.location.href
            })
          }}>
            <VscLiveShare/>
          </Button>
          <CopyToClipboard text={window.location.href} onCopy={() => alert("복사되었습니다")}>
            <Button square>
              <VscCopy/>
            </Button>
          </CopyToClipboard>
          <Button square onClick={() => navigate("edit")}>
            <VscEdit/>
          </Button>
          <Button square onClick={async () => {
            if (confirm("해당 메모를 제거하시겠습니까?")) {
              try {
                await axios.delete('/' + id)
                alert("제거가 완료되었습니다")
              } catch(e) {
                alert(e.response.data.msg)
              }
              navigate("/")
            }
          }}>
            <VscTrash/>
          </Button>
        </Flex>
      </Box>
    </>
  )
}

export default MemoDetailPage