import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import useSWRInfinite from 'swr/infinite'
import { FaRegGrinBeamSweat } from 'react-icons/fa'
import { RotatingLines } from  'react-loader-spinner'
import useIntersectionObserver from '@leejaehyeon/use-intersection-observer';

const baseName = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '/npm/' : '/website/react/react-30-project/23.Search/dist/'

const getKey = (pageIndex, previousPageData, query) => {
  if (!query || (previousPageData && previousPageData?.results?.length === 0)) return null;

  return `https://api.unsplash.com/search/photos/?client_id=${process.env.REACT_APP_Unsplash_API_KEY}&page=${pageIndex+1}&query=${query}&per_page=12`;
}

const fetcher = async (url)  => {
  const res = await fetch(url)
  return res.json();
}

function App() {
  const [query, setQuery] = useState("")
  const ref = useRef()
  const isIntersecting = useIntersectionObserver(ref)

  const onKeyDown = useCallback((event) => {
    if (event.key === 'Enter' && event.target.value.trim().length > 0) {
      setQuery(event.target.value.trim())
    }
  }, [])

  const {data, error, setSize, isValidating} = useSWRInfinite((...args) => getKey(...args, query), fetcher, {revalidateFirstPage: false, revalidateOnFocus: false})

  const photos = data?.map(item => item.results).flat() ?? []
  const isEmpty = data?.[0]?.results?.length === 0
  const isEnd = photos.length === data?.[0]?.total
  const isLoading = (!data && !error && query) || isValidating

  useEffect(() => {
    if (isIntersecting && !isEnd && !isLoading) {
      setSize((oldSize) => oldSize + 1)
    }
  }, [isIntersecting, setSize, isEnd, isLoading])

  return (
    <>
      <div className='input-container'>
        <input
          type='text'
          placeholder='검색어를 입력해주세요'
          className='search-input'
          onKeyDown={onKeyDown}
        />
      </div>
      {
        isEmpty
          ? <div className='no-result'>
              <FaRegGrinBeamSweat className='no-result-icon'/>
              No Images Found
            </div>
          : null
      }
      <div className='image-container'>
        {
          photos.map(({urls, alt_description}, index) => (
            <img
              key={index}
              className='image'
              src={urls?.regular}
              alt={alt_description}
            />
          ))
        }
      </div>
      <div ref={ref} className='loading'>
        {isLoading ? <RotatingLines width='100' strokeColor='white'/> : isEnd && !isEmpty ? <p>- - No More Images - -</p> : null}
      </div>
    </>
  );
}

export default App;