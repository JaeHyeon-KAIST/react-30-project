const request = async (url) => {
  try {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data;
    }
    const errData = await response.json()
    throw errData
  } catch(e) {
    console.log(e)
  }
}

const getProductData = async () => {
  const data = await request('./api/productData.json')
  return data;
}

export default getProductData;