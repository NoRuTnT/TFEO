import React, { useEffect } from 'react';
import '../../styles/home/MapBox.css';
import { theme } from '../../styles/Theme'; // 테마에서 기본 색상을 사용하기 위해 가져옵니다.
import { useHomeStore } from '../../store/HomeStore';
import axios from 'axios';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapBox() {
  const { homes, setVisibleHomes, setHomes, isMapLoaded, setIsMapLoaded } = useHomeStore();

  useEffect(() => {
    // Axios 요청으로 homes 상태 업데이트
    const fetchData = async () => {
      try {
        const requestData = {
          internet: false,
          gas: false,
          washing_machine: false,
          air_conditioner: true,
          refrigerator: true,
          elevator: true,
          microwave: true,
          toilet: true,
          breakfast: true,
          heating: true,
          parking: true,
          station: false,
          move_in_date: true,
          sink: true,
          APT: true,
          OPST: true,
          VL: true,
          JT: true,
          DDDGG: true,
          OR: true,
          rent_max: 100,
          rent_min: 0,
        };
        const response = await axios.post('http://localhost:8000/testing/test', requestData);
        setHomes(response.data); // 상태 업데이트
        setIsMapLoaded(true); // 지도 로드 플래그 설정
      } catch (error) {
        console.error('집 리스트를 가져오는 데 실패했습니다 : ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isMapLoaded) {
      loadMap(); // 지도 로드 조건을 mapLoaded로 설정
    }
  }, [isMapLoaded, setVisibleHomes]); // mapLoaded에 의존하는 useEffect

  const makeClusterer = (map: any) => {
    return new window.kakao.maps.MarkerClusterer({
      map: map,
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
  };
  const loadMap = () => {
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

      const updateVisibleHomes = () => {
        const bounds = newMap.getBounds();
        setVisibleHomes(
          homes.filter((home) => {
            const position = new window.kakao.maps.LatLng(home.lat, home.lng);
            console.log('포지션마커추가');
            return bounds.contain(position);
          }),
        );
      };
      console.log(markers);
      const clusterer = makeClusterer(newMap);
      clusterer.addMarkers(markers);
      window.kakao.maps.event.addListener(newMap, 'center_changed', updateVisibleHomes);
      window.kakao.maps.event.addListener(newMap, 'zoom_changed', updateVisibleHomes);
      updateVisibleHomes();
    });
  };

  return (
    <div className="mapbox-container" id="map" style={{ width: '100%', height: '630px', marginTop: '67px' }}></div>
  );
}
