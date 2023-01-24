import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import SearchTermRequired from './SearchTermRequired'
import { Oval } from  'react-loader-spinner'
import axios from 'axios'
import NoResult from './NoResult'
import ReactPaginate from 'react-paginate'

function AllResult() {
  const location = useLocation()
  const search = new URLSearchParams(location.search).get("q")
  const itemsPerPage = 10;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const {data, isLoading} = useQuery(
    ["allResult", search],
    () =>
      axios.get(
        `https://seo-api.p.rapidapi.com/v1/search/q=${search}&num=50`,
        {
          headers: {
          'X-Proxy-Location': 'KR',
          'X-RapidAPI-Key': process.env.REACT_APP_SEO_API_KEY,
          'X-RapidAPI-Host': 'seo-api.p.rapidapi.com'
          }
        }
      ).then(data => data.data),
    {
      refetchOnWindowFocus: false,
      enabled: !!search,
      cacheTime: 0
    }
  )

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(data?.results?.slice(itemOffset, endOffset))
    setPageCount(Math.ceil((data?.results?.length ?? 0) / itemsPerPage))
  }, [itemOffset, data?.results])

  const handlePageClick = useCallback((e) => {
    setItemOffset(e.selected * itemsPerPage % data?.results?.length)
  }, [data?.results])

  if (!search) return <SearchTermRequired/>

  if (isLoading) return <Oval
  ariaLabel='oval-loading'
    height={100}
    width={100}
    strokeWidth={5}
    color="#22C55E"
    secondaryColor="white"
    wrapperClass="flex justify-center mt-52"
  />

  return (
   <>
      <div className="flex flex-col justify-center align-middle m-auto w-[700px]">
        {
          data?.results.length > 0
            ? currentItems?.map(({link, title, description}, index) => (
                <div key={index} className="mt-10">
                  <a href={link} target="_blank" rel="noreferrer">
                    <p className="text-sm">
                      {link.length > 40 ? link.substring(0, 40) : link}
                    </p>
                    <p className="text-lg text-blue-700 hover:underline">
                      {title}
                    </p>
                    <p className="text-xs">
                      {description}
                    </p>
                  </a>
                </div>
              ))
            : <NoResult/>
        }
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        previousLabel="<<"
        pageRangeDisplayed={10}
        pageLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        previousLinkClassName="text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        nextLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        breakLinkClassName="-ml-[1] text-[#22C55E] bg-slate-50 block border-solid border border-[#dee2e6] px-[0.75rem] py-[0.375rem] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        containerClassName="flex ml-auto mr-auto w-fit mt-10 pb-10 select-none"
        activeLinkClassName="z-[3] text-slate-50 bg-[#22C55E] border-[#22C55E] focus:text-[#e9ecef] focus:z-[3] focus:bg-[#22C55E] focus:outline-0 hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        disabledLinkClassName="text-[#6c757d] pointer-events-none bg-slate-50 border-[#dee2e6] hover:z-[2] hover:text-[#22C55E] hover:bg-[#e9ecef] hover:border-[#dee2e6]"
        renderOnZeroPageCount={null}
        onPageChange={handlePageClick}
        pageCount={pageCount}
      />
   </>
  )
}

export default AllResult