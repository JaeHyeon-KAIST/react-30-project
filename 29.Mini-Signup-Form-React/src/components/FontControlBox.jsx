import React, { useEffect, useState } from 'react'

const $html = document.documentElement

const MAX_FONT_SIZE = 20
const MIN_FONT_SIZE = 12

const getHhtmlFontSize = () => parseFloat(window.getComputedStyle($html).fontSize)

function FontControlBox() {
  const [fontSize, setFontSize] = useState(getHhtmlFontSize())

  const handleFontSizeControl = (flag) => {
    let newFontSize = flag === 'increase' ? getHhtmlFontSize() + 1 : getHhtmlFontSize() - 1

    setFontSize(prev => flag === 'increase' ? prev + 1 : prev - 1)
  }

  useEffect(() => {
    $html.style.fontSize = fontSize + "px"
  }, [fontSize])

  return (
    <aside
      id="font-control-box"
      className="flex fixed bottom-0 right-0"
    >
      <button
        id="increase-font-btn"
        onClick={() => handleFontSizeControl('increase')}
        disabled={fontSize >= MAX_FONT_SIZE}
        className="bg-white text-gray-500 border border-gray-300 hover:bg-red-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
      >
        +
      </button>
      <button
        id="decrease-font-btn"
        onClick={() => handleFontSizeControl('decrease')}
        disabled={fontSize <= MIN_FONT_SIZE}
        className="bg-white text-gray-500 border border-gray-300 hover:bg-blue-50 focus:outline-none focus:shadow-outline disabled:bg-gray-500 disabled:text-white rounded-full"
      >
        -
      </button>
    </aside>
  )
}

export default FontControlBox