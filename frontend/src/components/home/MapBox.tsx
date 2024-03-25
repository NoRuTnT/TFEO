import React, { useEffect, useState } from 'react';
import '../../styles/home/MapBox.css';
import { theme } from '../../styles/Theme'; // 테마에서 기본 색상을 사용하기 위해 가져옵니다.
import { useHomeStore } from '../../store/HomeStore';

// 필터의 상태가 바뀌면 리렌더링 해야함
// 필터 상태 바꾸는 메서드 호출될 때마다 집 리스트 계산 작업 수행해야함
// 집 리스트에 대한 상태를 헤더, 지도가 공유해야함 -> HomeStore 내에서 집 리스트를 관리해야 함

declare global {
  interface Window {
    kakao: any;
  }
}

interface Location {
  lat: number;
  lng: number;
}

export default function MapBox() {
  const [map, setMap] = useState(null);
  const { homes } = useHomeStore();


  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(37.566535, 126.977969),
        level: 7,
        minLevel: 3,
        draggable: true, // 여기서 드래그 가능하도록 설정
      };

      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);

      let markers = window.kakao.maps.Marker[] = [];

      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: newMap,
        averageCenter: true,
        minLevel: 3,
        minClusterSize: 1, // 클러스터링 적용 최소 마커 수를 1로 설정합니다.
        calculator: [3, 5, 10], // 이 숫자들을 기준으로 클러스터의 크기가 변경됩니다.
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

      // 지도에 표시할 마커 업데이트 함수
      const updateMarkers = (filteredHomes: any[]) => {
        // 기존 마커 제거
        markers.forEach((marker) => marker.setMap(null));
        markers = [];

        // 필터링된 homes 기반으로 마커 생성
        markers = filteredHomes.map((home) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(home.lat, home.lng),
          });
          marker.setMap(newMap); // 마커를 지도에 표시
          return marker;
        });
      };
      // 지도 영역 변경 시 필터링된 homes 업데이트
      const updateHomesInMapArea = () => {
        const bounds = newMap.getBounds();
        const swLatLng = bounds.getSouthWest();
        const neLatLng = bounds.getNorthEast();

        const filteredHomes = homes.filter((home) => {
          return (
            home.lat >= swLatLng.getLat() &&
            home.lat <= neLatLng.getLat() &&
            home.lng >= swLatLng.getLng() &&
            home.lng <= neLatLng.getLng()
          );
        });
        updateMarkers(filteredHomes); // 마커 업데이트
      };

      window.kakao.maps.event.addListener(map, 'bounds_changed', updateHomesInMapArea);

      // 클러스터 클릭 이벤트 리스너
      window.kakao.maps.event.addListener(clusterer, 'clusterclick', function () {
        alert('cluster clicked!');
      });

      // 줌 이벤트 리스너
      window.kakao.maps.event.addListener(clusterer, 'clusterclick', function () {
        alert('cluster clicked!');
      });

      updateHomesInMapArea(); // 초기 로드 시 실행
    });
  }, [homes]);

  return <div className="mapbox-container" id="map" style={{ width: '100%', height: '700px' }}></div>;
}
