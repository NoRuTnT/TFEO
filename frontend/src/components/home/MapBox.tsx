import React, { useEffect, useState } from 'react';
import '../../styles/home/MapBox.css';
import { theme } from '../../styles/Theme'; // 테마에서 기본 색상을 사용하기 위해 가져옵니다.
import { useHomeStore } from '../../store/HomeStore';
import { RecommendAxios } from '../../api/RecommendAxios';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapBox() {
  const [isMounted, setIsMounted] = useState(false);
  const {
    homes, // 집 전체 조회 목록 (추천 반영)
    setHomes,
    setVisibleHomes,
    headerFilterChanged,
    searchFilterChanged,
    filter_condition,
    search_condition, // 집 검색 조건
    member_personality, // 학생 성향
    setHeaderFilterChanged,
    setSearchFilterChanged,
  } = useHomeStore();

  const fetchData = async () => {
    try {
      const requestData = {
        filter_condition: filter_condition,
        search_condition: search_condition,
        member_personality: member_personality,
      };
      const response = await RecommendAxios.post('/recommend', requestData);
      setHomes(response.data);
      setHeaderFilterChanged(false);
      setSearchFilterChanged(false);
    } catch (error) {
      console.error('집 리스트 조회 실패 : ', error);
    }
  };

  // MapBox.tsx 마운트 시 최초 1회 fetch (집 리스트)
  useEffect(() => {
    fetchData()
      .then(() => loadMap())
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (headerFilterChanged) {
      // console.log(filter_condition);
      fetchData()
        .then(() => loadMap())
        .catch((error) => console.error(error));
    }
  }, [headerFilterChanged]);

  useEffect(() => {
    console.log('동작을하긴하는거지?');
    if (searchFilterChanged) {
      // console.log(filter_condition);
      fetchData()
        .then(() => loadMap())
        .catch((error) => console.error(error));
    }
  }, [searchFilterChanged]);

  const makeClusterer = (map: any) => {
    console.log('클러스터 생성');
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

      // 집 리스트를 돌면서 마커 배열을 생성
      const updateMarkers = () => {
        return homes.map((home) => {
          return new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(home.lat, home.lng),
          });
        });
      };

      let markers = updateMarkers();

      const clusterer = makeClusterer(newMap);
      clusterer.addMarkers(markers);

      // 지도 바운드 안에 들어오는 포지션의 집 마커를 visibleHomes에 추가하는 함수
      const updateVisibleHomes = () => {
        markers = updateMarkers();
        const bounds = newMap.getBounds();
        setVisibleHomes(
          homes.filter((home) => {
            const position = new window.kakao.maps.LatLng(home.lat, home.lng);
            return bounds.contain(position);
          }),
        );
      };

      window.kakao.maps.event.addListener(newMap, 'center_changed', updateVisibleHomes);
      window.kakao.maps.event.addListener(newMap, 'zoom_changed', updateVisibleHomes);
      updateVisibleHomes();
    });
  };

  return (
    <div className="mapbox-container" id="map" style={{ width: '100%', height: '630px', marginTop: '67px' }}></div>
  );
}
