const request = async (url) => {
  try {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      return data;
    }
  } catch (e) {
    console.error(e)
  }
}

export default request;