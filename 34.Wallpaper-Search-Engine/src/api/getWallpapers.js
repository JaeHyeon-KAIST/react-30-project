import request from "./request"

const BASE_URL = 'https://pixabay.com/api'

const defaultParam = {
  key: process.env.REACT_APP_PIXABAY_API_KEY
}

const getWallPapers = async (parmObj) => {
  const params = new URLSearchParams({...defaultParam, ...parmObj}).toString()
  const result = await request(`${BASE_URL}/?${params}`)
  return result;
}

export default getWallPapers;