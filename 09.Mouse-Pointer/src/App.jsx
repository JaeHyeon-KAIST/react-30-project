import React, { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import blue_cursor from './images/blue_cursor.png';
import cursor1 from './images/cursor1.png';
import cursor2 from './images/cursor2.png';
import cursor3 from './images/cursor3.png';

const cursors = ["blue_cursor", "cursor1", "cursor2", "cursor3"];

const cursors_img = {
  blue_cursor: blue_cursor,
  cursor1: cursor1,
  cursor2: cursor2,
  cursor3: cursor3,
}

function App() {
  const [selectedCursor, setSelectedCursor] = useState("blue_cursor");
  const [cursorPosition, setCursorPosition] = useState([0, 0]);
  const [calibratedCursorPosition, setCalibratedCursorPosition] = useState([0, 0]);

  useEffect(() => {
    const event = ({clientX, clientY}) => {
      setCursorPosition([clientX, clientY]);
      const pos = [clientX, clientY];

			switch (selectedCursor) {
				case "blue_cursor":
					pos[0] -= 16
					break;
				case "cursor1":
					pos[0] -= 18
					break;
				case "cursor2":
					pos[0] -= 32
					pos[1] -= 32
					break;
				case "cursor3":
					pos[0] -= 32
					pos[1] -= 32
					break;
			}

      setCalibratedCursorPosition(pos);
    }
    window.addEventListener("mousemove", event);
  
    return () => window.removeEventListener("mousemove", event);
  }, [])

  return (
    <>
      <img
        style={{
          pointerEvents: "none",
          position: "fixed",
          left: calibratedCursorPosition[0],
          top: calibratedCursorPosition[1],
          width: "100px"
        }}
        src={cursors_img[selectedCursor]}
      />
      <div style={{
        fontSize: "24px"
      }}>
        버튼을 눌러서 마우스 커서를 바꿔보세요.
      </div>
      <div style={{
        marginTop: "16px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        {
          cursors.map(cursor => (
            <Button onClick={()=>setSelectedCursor(cursor)} selected={selectedCursor === cursor} src={cursors_img[cursor]} key={cursor}/>
          ))
        }
      </div>
    </>
  );
}

export default App;