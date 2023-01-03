import React from 'react';

function Button({selected = false, src, onClick}) {
  return (
    <div style={{
      boxSizing: "border-box",
      width: "100px",
      height: "100px",
      padding: "16px",
      boxShadow: `0 0 0 ${selected ? 6 : 1}px black inset`
    }} onClick={onClick}>
      <img src={src} width="100%" height="100%"/>
    </div>
  )
}

export default Button