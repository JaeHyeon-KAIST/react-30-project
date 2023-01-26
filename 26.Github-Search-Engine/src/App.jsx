import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import User from './pages/User';

const baseName = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '/npm/' : '/website/react/react-30-project/26.Github-Search-Engine/dist/'

function App() {
  
  return (
    <BrowserRouter basename={baseName}>
      <AppBar position="static">
        <Toolbar>
          <IconButton href="/">
            <GitHubIcon sx={{color:'white', marginRight: '20px'}}/>
          </IconButton>
          <Typography variant='h6' component='div'>
            Gihub Search Engine
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{maxWidth:'1000px', margin:'auto', display:'flex', flexDirection:'column', justifyContent:'center'}}>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/user/:username' element={<User/>} />
          <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;