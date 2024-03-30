import React, { useEffect } from 'react';
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
  const {
    homes,
    visibleHomes,
    setVisibleHomes,
    setHomes,
    isMapLoaded,
    setIsMapLoaded,
    search_condition,
    member_personality,
    headerFilterChanged,
  } = useHomeStore();

  // MapBox.tsx 마운트 시 최초 1회 fetch (집 리스트)
  useEffect(() => {
    // Axios 요청으로 homes 상태 업데이트
    const fetchData = async () => {
      try {
        const requestData = {
          search_condition: search_condition,
          member_personality: member_personality,
        };
        const response = await RecommendAxios.post('/recommend', requestData);
        console.log(response.data);
        // response를 homes 배열로 설정한다.
        setHomes(response.data);
        setVisibleHomes(response.data);
        // homes를 기반으로 지도가 로드될 수 있도록 지도 로드 플래그 설정
        setIsMapLoaded(true);
      } catch (error) {
        console.error('집 리스트를 가져오는 데 실패했습니다 : ', error);
      }
    };
    fetchData();
  }, []);

  // 지도 로드 플래그나, setVisibleHomes 가 호출될 때 loadMap 한다.
  useEffect(() => {
    if (isMapLoaded) {
      console.log('homes : ', homes);
      loadMap(); // 지도 로드 조건을 mapLoaded로 설정
    }
  }, [setIsMapLoaded, setVisibleHomes]); // mapLoaded에 의존하는 useEffect

  useEffect(() => {
    if (isMapLoaded && headerFilterChanged) {
      setHomes(visibleHomes);
      console.log('포지션 마커 필터링 완료 : visibleHomes 설정 (지도에 보이는 집 리스트)', visibleHomes);
      loadMap();
    }
  }, [headerFilterChanged, setVisibleHomes, setHomes]); // mapLoaded에 의존하는 useEffect

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
      const markers = visibleHomes.map((home) => {
        return new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(home.lat, home.lng),
        });
      });

      // 클러스터러 생성
      const clusterer = makeClusterer(newMap);
      // 클러스터러에 마커 등록
      clusterer.addMarkers(markers);

      // 지도 바운드 안에 들어오는 포지션의 집 마커를 visibleHomes에 추가하는 함수
      const updateVisibleHomes = () => {
        const bounds = newMap.getBounds();
        setVisibleHomes(
          homes.filter((home) => {
            const position = new window.kakao.maps.LatLng(home.lat, home.lng);
            return bounds.contain(position);
          }),
        );
        console.log('포지션 마커 필터링 완료 : visibleHomes 설정 (지도에 보이는 집 리스트)', homes, visibleHomes);
      };

      // 지도 이동 or 줌 이벤트 발생 시 homes를 필터링
      window.kakao.maps.event.addListener(newMap, 'center_changed', updateVisibleHomes);
      window.kakao.maps.event.addListener(newMap, 'zoom_changed', updateVisibleHomes);
      updateVisibleHomes();
    });
  };

  return (
    <div className="mapbox-container" id="map" style={{ width: '100%', height: '630px', marginTop: '67px' }}></div>
  );
}
