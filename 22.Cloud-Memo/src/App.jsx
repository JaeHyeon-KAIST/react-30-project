import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './Routes';
import axios from 'axios'

const baseName = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '/npm/' : '/website/react/react-30-project/22.Cloud-Memo/dist/'

axios.defaults.baseURL = "https://jaehyeon.art/3101"

function App() {
  return (
    <BrowserRouter basename={baseName}>
      <Routes />
    </BrowserRouter>
  );
}

export default App;