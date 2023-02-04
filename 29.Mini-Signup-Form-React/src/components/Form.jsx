import React, { useCallback, useState } from 'react'
import FormInput from './FormInput'

const initialErrorData = {
  id: '',
  pw: '',
  confirmPw: ''
}

function Form({modalRef}) {
  const [errorData, setErrorData] = useState(initialErrorData)
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const isValid = Object.values(errorData).every(value => value === true)
    isValid && modalRef.current.showModal()
  })
  
  return (
    <form
      id="form"
      className="w-full max-w-md m-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <FormInput id={'id'} label={'아이디'} inputProps={{type:"text", placeholder:"아이디를 입력해주세요"}} errorData={errorData} setErrorData={setErrorData}/>
      <FormInput id={'pw'} label={'비밀번호'} inputProps={{type:"password", placeholder:"비밀번호를 입력해주세요", autoComplete:"off"}} errorData={errorData} setErrorData={setErrorData}/>
      <FormInput id={'confirmPw'} label={'비밀번호'} inputProps={{type:"password", placeholder:"비밀번호 확인을 입력해주세요", autoComplete:"off"}} errorData={errorData} setErrorData={setErrorData}/>

      <div className="flex items-center justify-center">
        <input
          id="submit"
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-500"
          value="가입하기"
        />
      </div>
    </form>
  )
}

export default Form