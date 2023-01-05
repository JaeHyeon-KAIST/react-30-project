import React, {useEffect, useRef, useState} from 'react'
import './App.css';

function App() {
  const mapRef = useRef(null);
  const [markerList, setMarkerList] = useState([]);
  // const [map, setMap] = useState();
  const map = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=5cc09211692ac7f46e3c9cad2672b031&autoload=false';
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        var options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 10,
          // draggable: false,
        };
        // setMap(new kakao.maps.Map(mapRef.current, options));
        map.current = new kakao.maps.Map(mapRef.current, options);

        kakao.maps.event.addListener(map.current, 'rightclick', (mouseEvent) => {
          const latlng = mouseEvent.latLng;

          const title = prompt("마커의 타이틀을 입력해주세요.");

          var marker = new kakao.maps.Marker({
            map: map.current,
            position: latlng,
            title
          });
          setMarkerList(prev => [...prev, marker]);
        });
      })
    }

    return () => script.remove(script);
  }, []);

  return (
    <div>
      <button onClick={() => {
        // map.setCenter(new kakao.maps.LatLng(37.5642135, 127.0016985))
        map.current.setCenter(new kakao.maps.LatLng(37.5642135, 127.0016985));
      }}>
        서울
      </button>
      <button onClick={() => {
        map.current.setCenter(new kakao.maps.LatLng(35.1379222, 129.055627775));
      }}>
        부산
      </button>
      <input type="range" min="1" max="20" onChange={(ev) => {
        map.current.setLevel(ev.currentTarget.value, {animate: true});
      }} />
      <button onClick={() => {
        map.current.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
      }}>
        지도 타입 변경
      </button>
      <div
        ref={mapRef}
        style={{
          width: 300,
          height: 300
      }}></div>
      {
        markerList.map(value => 
          <div onClick={() => {
            value.setMap(null)
            setMarkerList(markerList.filter(v => v!==value))
          }
          }>
            {value.getTitle()}
          </div>
        )
      }
    </div>
  );
}

export default App;