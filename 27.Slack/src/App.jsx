import { CircularProgress, Stack } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Join from './pages/Join';
import Login from './pages/Login';
import Main from './pages/Main';
import { clearUser, setUser } from './store/userReducer';
import './App.css'

const baseName = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '/npm/' : '/website/react/react-30-project/27.Slack/dist/'

function App() {
  const dispatch = useDispatch()
  const {isLoading, currentUser} = useSelector((state) => state.user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!!user) {
        dispatch(setUser(user))
      } else {
        dispatch(clearUser())
      }
    })

    return () => unsubscribe();
  }, [dispatch])

  if (isLoading) {
    return (
      <Stack alignItems='center' justifyContent='center' height='100vh'>
        <CircularProgress color='secondary' size={150}/>
      </Stack>
    )
  }
  
  return (
    <BrowserRouter basename={baseName}>
      <Routes>
        <Route path='/' element={currentUser ? <Main/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={currentUser ? <Navigate to='/'/> : <Login/>}/>
        <Route path='/join' element={currentUser ? <Navigate to='/'/> : <Join/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;