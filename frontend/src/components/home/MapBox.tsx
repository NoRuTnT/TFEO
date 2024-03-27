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
          {
            // 1 - 3 마커
            width: '35px',
            height: '35px',
            background: theme.palette.primary.main, // 테마의 기본 색상을 사용합니다.
            borderRadius: '50%',
            color: '#fff', // 텍스트 색상은 흰색입니다.
            textAlign: 'center',
            fontSize: '15px',
            fontWeight: 'bold',
            lineHeight: '35px',
            opacity: '85%',
          },
          {
            // 4 - 5 마커
            width: '50px',
            height: '50px',
            background: theme.palette.primary.main,
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            fontSize: '25px',
            fontWeight: 'bold',
            lineHeight: '50px',
            opacity: '85%',
          },
          {
            // 6 - 10 마커
            width: '70px',
            height: '70px',
            background: theme.palette.primary.main,
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            fontSize: '30px',
            fontWeight: 'bold',
            lineHeight: '70px',
            opacity: '85%',
          },
          {
            // 11개 이상 마커
            width: '80px',
            height: '80px',
            background: theme.palette.primary.main,
            borderRadius: '50%',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 'bold',
            lineHeight: '60px',
            opacity: '85%',
          },
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

  return (
    <div className="mapbox-container" id="map" style={{ width: '100%', height: '590px', marginTop: '120px' }}></div>
  );
}
