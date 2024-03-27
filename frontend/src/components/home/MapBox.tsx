import React, { useEffect, useState } from 'react';
import '../../styles/home/MapBox.css';
import { theme } from '../../styles/Theme'; // 테마에서 기본 색상을 사용하기 위해 가져옵니다.
import { useHomeStore } from '../../store/HomeStore';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapBox() {
  const { homes, setVisibleHomes } = useHomeStore();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.566535, 126.977969),
        level: 7,
        minLevel: 3,
      };

      const newMap = new window.kakao.maps.Map(container, options);

      const markers = homes.map((home) => {
        return new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(home.lat, home.lng),
        });
      });

      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        minLevel: 3,
        minClusterSize: 1,
        calculator: [3, 5, 10],
        styles: [
          // 클러스터 스타일링, 생략...
        ],
      });

      clusterer.addMarkers(markers);

      const updateVisibleHomes = () => {
        const bounds = newMap.getBounds();
        const visibleHomes = homes.filter((home) => {
          const position = new window.kakao.maps.LatLng(home.lat, home.lng);
          return bounds.contain(position);
        });
        setVisibleHomes(visibleHomes);
      };

      window.kakao.maps.event.addListener(newMap, 'center_changed', updateVisibleHomes);
      window.kakao.maps.event.addListener(newMap, 'zoom_changed', updateVisibleHomes);

      updateVisibleHomes();
    });
  }, [homes, setVisibleHomes]);

  return <div className="mapbox-container" id="map" style={{ width: '100%', height: '400px' }}></div>;
}
