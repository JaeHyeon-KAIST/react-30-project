const formatString = (num) => (num < 10 ? '0'+num : num)

const formatTime = (centisecond) => {
  const min = formatString(parseInt(centisecond / 6000))
  const sec = formatString(parseInt((centisecond - 6000 * min) / 100))
  const centisec = formatString(centisecond % 100)

  return `${min}:${sec}.${centisec}`
}

export default formatTime;