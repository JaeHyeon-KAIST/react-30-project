import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ToggleThemeButton from './components/ToggleThemeButton';
// import Hero from './components/Hero';
import ResultContainer from './components/Image/ImageContainer';
import Footer from './components/Footer';
import './App.css';
import getWallPapers from './api/getWallpapers';
import EmptyResult from './components/EmptyResult';
import Title from './components/Title';
import Search from './components/Search/Search';

const Container = styled.div`
  position: relative;
  background-color: var(--primary);
  min-height: 100vh;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  background-color: var(--secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  padding: 120px 32px 16px 32px;
`;

function App() {
  const [data, setData] = useState({total: 0, totalHits: 0, hits: []})
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState('popular')
  const [orientation, setOrientation] = useState('all')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)
  const target = useRef()

  const numOfPages = Math.ceil((data.totalHits ?? 0) / perPage)

  useEffect(() => {
    const fetch = async () => {
      const data = await getWallPapers({
        q: query,
        orientation: orientation,
        order: order,
        page: page,
        per_page: perPage
      })
      if (page === 1) {
        setData(data)
      } else {
        setData(prev => ({...prev, hits: [...prev.hits, ...data.hits]}))
      }
    }
    fetch()
  }, [query, orientation, order, page, perPage])

  console.log(data)

  const callback = ([entries]) => {
    if (entries.isIntersecting) {
      setPage(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (!target.current) return;
    
    const observer = new IntersectionObserver(callback, {
      threshold: 1
    })
    observer.observe(target.current)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [query, orientation, order, perPage])

  return (
    <>
      <Container>
          {/* <Hero setQuery={setQuery} setOrientation={setOrientation} setOrder={setOrder} setPerPage={setPerPage}/> */}
          <Header>
            <Title/>
            <Search setQuery={setQuery} setOrientation={setOrientation} setOrder={setOrder} setPerPage={setPerPage}/>
          </Header>
          <ResultContainer data={data} page={page} setPage={setPage} numOfPages={numOfPages}/>
          {page !== numOfPages && (
            <div ref={target}>
              <EmptyResult isLoading={data.totalHits} />
            </div>
          )}
          <Footer />
          <ToggleThemeButton />
      </Container>
    </>
  );
}

export default App;
