import React, { useEffect, useState } from 'react';
import '../../styles/home/MapBox.css';
import { theme } from '../../styles/Theme'; // 테마에서 기본 색상을 사용하기 위해 가져옵니다.

declare global {
  interface Window {
    kakao: any;
  }
}

interface Location {
  lat: number;
  lng: number;
}

const dummyData = {
  oneroom: [
    { lat: 37.566022, lng: 126.977969 },
    // 나머지 위치 데이터...
  ],
};

export default function MapBox() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.566535, 126.977969),
        level: 1,
        minLevel: 1,
      };

      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);

      const markers = dummyData.oneroom.map((location) => {
        return new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(location.lat, location.lng),
        });
      });

      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        minLevel: 8,
      });

      clusterer.addMarkers(markers);

      // 클러스터를 클릭했을 때 아무 동작도 하지 않도록 빈 함수를 할당합니다.
      window.kakao.maps.event.addListener(clusterer, 'clusterclick', function (cluster: any) {
        // 클러스터 클릭 시 아무런 동작도 하지 않습니다.
      });
    });
  }, []);

  return <div className="mapbox" id="map" style={{ width: '90%', height: '300px' }}></div>;
}
