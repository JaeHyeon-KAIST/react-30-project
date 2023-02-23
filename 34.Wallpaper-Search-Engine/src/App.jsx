import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ToggleThemeButton from './components/ToggleThemeButton';
import Hero from './components/Hero';
import ResultContainer from './components/ResultContainer';
import Footer from './components/Footer';
import './App.css';
import getWallPapers from './api/getWallpapers';

const Container = styled.div`
  position: relative;
  background-color: var(--primary);
  min-height: 100vh;
`;

function App() {
  const [data, setData] = useState({})
  const [query, setQuery] = useState('')
  const [order, setOrder] = useState('popular')
  const [orientation, setOrientation] = useState('all')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(20)

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
      setData(data)
    }
    fetch()
  }, [query, orientation, order, page, perPage])

  return (
    <>
      <Container>
          <Hero setQuery={setQuery} setOrientation={setOrientation} setOrder={setOrder} setPerPage={setPerPage}/>
          <ResultContainer data={data} page={page} setPage={setPage} numOfPages={numOfPages}/>
          <Footer />
          <ToggleThemeButton />
      </Container>
    </>
  );
}

export default App;
