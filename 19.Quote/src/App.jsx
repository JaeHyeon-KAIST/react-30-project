import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from './components/Box';
import Flex from './components/Flex';
import { VscListUnordered, VscArrowLeft, VscAdd, VscTrash, VscEdit, VscClose, VscCheck } from 'react-icons/vsc';

axios.defaults.baseURL = "https://jaehyeon.art/quote-api"

function App() {
  const [page, setPage] = useState('main');
  const [nowData, setNowData] = useState();
  const [dataList, setDataList] = useState();
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(false);
  const [createInp, setCreateInp] = useState(["", ""]);
  const [editInp, setEditInp] = useState(["", ""]);
  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    if (page === 'main') {
      axios.get("/random")
        .then(e => setNowData(e.data))
        .catch(() => setError("명언을 불러오지 못했습니다."))
    } else {
      axios.get("/")
        .then(e => setDataList(e.data))
        .catch(() => setError("명언을 불러오지 못했습니다."))
    }
  }, [page])

  if (page === 'main') {
    return (
      <>
        <Flex position={"fixed"} right={"64px"} height={"64px"} top={"64px"}>
          <Flex bg={"#2699FB"} width={"48px"} height={"48px"} borderRadius={"4px"} alignItems={"center"} justifyContent={"center"} onClick={() => setPage('edit')}>
            <VscListUnordered color='white' fontSize={"32px"} />
          </Flex>
        </Flex>
        <Flex flexDirection={"column"} px={"16px"} alignItems={"center"} justifyContent={"center"} height={"100vh"} ml={"15px"} mr={"15px"}>
          <Box fontSize={"24px"}>
            오늘의 명언
          </Box>
          <Flex overflowX={"scroll"} mt={"64px"} mb={"16px"} px={"16px"} border={"solid 1px #707070"} width={"100%"} alignItems={"center"} justifyContent={"center"} height={"160px"} fontSize={"48px"}>
            <Box width={"100%"} style={{whiteSpace: "pre"}}>
              {error.length > 0 && error}
              {nowData?.message}
            </Box>
          </Flex>
          <Box fontSize={"24px"}>
            {nowData?.author}
          </Box>
        </Flex>
      </>
    );
  } else {
    return (
      <Flex pt={["8px", "64px", "64px"]} pl={["8px", "64px", "64px"]} flexDirection={"column"}>
        <Flex pb={"44px"} style={{gap: "44px"}}>
          <Flex bg={"#2699FB"} width={"48px"} height={"48px"} borderRadius={"4px"} alignItems={"center"} justifyContent={"center"} onClick={() => setPage('main')}>
            <VscArrowLeft color='white' fontSize={"32px"} />
          </Flex>
          <Flex bg={"#2699FB"} width={"48px"} height={"48px"} borderRadius={"4px"} alignItems={"center"} justifyContent={"center"} onClick={() => setCreateMode(prev => !prev)}>
            {
              createMode
                ? <VscClose color='white' fontSize={"32px"} />
                : <VscAdd color='white' fontSize={"32px"} />
            }
            
          </Flex>
        </Flex>

        {
          dataList?.map((data, idx) => (
            <Flex width={["calc(100% - 8px)", "416px", "416px"]} height={"48px"} mb={"16px"} key={data.message}>
              <Flex border={"solid 1px #707070"} flex={1} overflowX={"scroll"} style={{whiteSpace:'pre'}}>
                {
                  data.message === selectedData
                    ? <>
                        <input value={editInp[0]} onChange={(event) => setEditInp(prev => [event.target.value, prev[1]])}/>
                        <input value={editInp[1]} onChange={(event) => setEditInp(prev => [prev[0], event.target.value])}/>
                      </>
                    : `[${data.author}] ${data.message}`
                }
                
              </Flex>
              <Flex bg={"#2699FB"} width={"48px"} height={"48px"} borderRadius={"4px"} alignItems={"center"} justifyContent={"center"} onClick={() => {
                if (data.message === selectedData) {
                  axios.put('/' + idx, {
                    "author": editInp[0],
                    "message": editInp[1]
                  }).then(({data}) => {
                    if (data.rs) {
                      setDataList([])
                      setEditInp(['', ''])
                      setSelectedData(null)
                      alert("수정 완료!")
                      axios.get("/")
                        .then(e => setDataList(e.data))
                        .catch(() => setError("명언을 수정하지 못했습니다."))
                    } else alert("수정 실패!")
                  })
                } else {
                  setSelectedData(data.message)
                  setEditInp([data.author, data.message])
                }
              }}>
                {
                  data.message === selectedData
                    ? <VscCheck color='white' fontSize={"32px"} />
                    : <VscEdit color='white' fontSize={"32px"} />
                }
              </Flex>
              <Flex bg={"#FF0C0C"} width={"48px"} height={"48px"} borderRadius={"4px"} alignItems={"center"} justifyContent={"center"} onClick={() => {
                if (confirm("정말 해당 명언을 제거하겠습니까?")) {
                  axios.delete('/' + idx)
                    .then(({data}) => {
                      if (data.rs) {
                        setDataList([])
                        alert("제거 완료!")
                        axios.get("/")
                          .then(e => setDataList(e.data))
                          .catch(() => setError("명언을 불러오지 못했습니다."))
                      } else alert("제거 실패!")
                    })
                }
              }}>
                <VscTrash color='white' fontSize={"32px"} />
              </Flex>
            </Flex>
          ))
        }
        {
          createMode && <>
            <Flex width={"416px"} height={"48px"} mb={"16px"}>
              <Flex border={"solid 1px #707070"} flex={1} overflowX={"scroll"} style={{whiteSpace:'pre'}}>
                <input value={createInp[0]} onChange={(event) => setCreateInp(prev => [event.target.value, prev[1]])}/>
                <input value={createInp[1]} onChange={(event) => setCreateInp(prev => [prev[0], event.target.value])}/>
              </Flex>
              <Flex bg={"#2699FB"} width={"48px"} height={"48px"} borderRadius={"4px"} alignItems={"center"} justifyContent={"center"} onClick={() => {
                if (createInp[0].length === 0 || createInp[1].length === 0) {
                  alert("정상적인 값이 아닙니다.")
                  return;
                }

                axios.post('/', {
                  "author": createInp[0],
                  "message": createInp[1]
                }).then(({data}) => {
                  if (data.rs) {
                    setDataList([])
                    setCreateInp(['', ''])
                    setCreateMode(false)
                    alert("생성 완료!")
                    axios.get("/")
                      .then(e => setDataList(e.data))
                      .catch(() => setError("명언을 생성하지 못했습니다."))
                  } else alert("생성 실패!")
                })
              }}>
                <VscCheck color='white' fontSize={"32px"} />
              </Flex>
            </Flex>
          </>
        }
      </Flex>
    )
  }
}
  

export default App;