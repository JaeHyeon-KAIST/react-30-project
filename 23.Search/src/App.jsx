import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import SearchInput from './components/SearchInput';
import { QueryClient, QueryClientProvider } from 'react-query'
import AllResult from './components/results/AllResult';
import NewsResult from './components/results/NewsResult';
import ImageResult from './components/results/ImageResult';

const baseName = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '/npm/' : '/website/react/react-30-project/23.Search/dist/'

const queryClient = new QueryClient

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={baseName}>
        <div className='bg-slate-50 min-h-screen'>
          <div className='flex flex-wrap justify-center relative'>
            <SearchInput/>
            <NavigationBar/>
          </div>
          <Routes>
            <Route exact path="/" element={<Navigate to="/all" />} />
            <Route exact path="/all" element={<AllResult/>} />
            <Route exact path="/news" element={<NewsResult/>} />
            <Route exact path="/image" element={<ImageResult/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;