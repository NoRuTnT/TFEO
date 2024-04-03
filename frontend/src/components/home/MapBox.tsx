import React, { useEffect, useState } from 'react';
import '../../styles/home/MapBox.css';
import { theme } from '../../styles/Theme'; // 테마에서 기본 색상을 사용하기 위해 가져옵니다.
import { useHomeStore } from '../../store/HomeStore';
import { useMemberStore } from '../../store/MemberStore';
import { RecommendAxios } from '../../api/RecommendAxios';
import { getMember } from '../../api/MemberApis';
import { MemberInfoUtils } from '../../utils/memberUtils';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function MapBox() {
  const [isMounted, setIsMounted] = useState(false);
  const {
    lat,
    lng,
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
    setMemberPersonality,
    setCenterPosition,
  } = useHomeStore();
  const { MemberInfo } = useMemberStore();

  const fetchFirstData = async () => {
    console.log(MemberInfo.gender);
    console.log(MemberInfo.memberPersonality);
    try {
      const requestData = {
        filter_condition: {
          school: false,
          subway: false,
          apartment: false,
          pets: false,
        },
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

  const fetchData = async () => {
    try {
      const requestData = {
        filter_condition: filter_condition,
        search_condition: search_condition,
        member_personality: member_personality,
      };
      console.log('해당 조건으로 검색합니다 : ', requestData);
      const response = await RecommendAxios.post('/recommend', requestData);
      setHomes(response.data);
      console.log('집 추천 리스트 : ', response.data);
      setHeaderFilterChanged(false);
      setSearchFilterChanged(false);
    } catch (error) {
      console.error('집 리스트 조회 실패 : ', error);
    }
  };

  // 집 리스트 조회 전, 학생의 성향 정보를 request에 반영합니다.
  const loadMemberInfo = async () => {
    // 학생 성향 정보가 있다면,
    if (MemberInfo.memberPersonality) {
      // boolean으로 재 조정
      setMemberPersonality({
        member_personality_no: MemberInfo.memberPersonality.memberPersonalityNo,
        daytime: MemberInfo.memberPersonality.daytime == 0 ? false : true,
        nighttime: MemberInfo.memberPersonality.nighttime == 0 ? false : true,
        fast: MemberInfo.memberPersonality.fast == 0 ? false : true,
        late: MemberInfo.memberPersonality.late == 0 ? false : true,
        dinner: MemberInfo.memberPersonality.dinner == 0 ? false : true,
        smoke: MemberInfo.memberPersonality.smoke == 0 ? false : true,
        drink: MemberInfo.memberPersonality.drink == 0 ? false : true,
        outside: MemberInfo.memberPersonality.outside == 0 ? false : true,
        inside: MemberInfo.memberPersonality.inside == 0 ? false : true,
        quiet: MemberInfo.memberPersonality.quiet == 0 ? false : true,
        live_long: MemberInfo.memberPersonality.liveLong == 0 ? false : true,
        live_short: MemberInfo.memberPersonality.liveShort == 0 ? false : true,
        pet: MemberInfo.memberPersonality.pet == 0 ? false : true,
        cold: MemberInfo.memberPersonality.cold == 0 ? false : true,
        hot: MemberInfo.memberPersonality.hot == 0 ? false : true,
        host_house_prefer: MemberInfo.memberPersonality.hostHousePrefer,
      });
    } else {
      try {
        const response = await getMember();
        if (response) {
          MemberInfoUtils(response);
          setMemberPersonality({
            member_personality_no: response.memberPersonality.memberPersonalityNo,
            daytime: response.memberPersonality.daytime == 0 ? false : true,
            nighttime: response.memberPersonality.nighttime == 0 ? false : true,
            fast: response.memberPersonality.fast == 0 ? false : true,
            late: response.memberPersonality.late == 0 ? false : true,
            dinner: response.memberPersonality.dinner == 0 ? false : true,
            smoke: response.memberPersonality.smoke == 0 ? false : true,
            drink: response.memberPersonality.drink == 0 ? false : true,
            outside: response.memberPersonality.outside == 0 ? false : true,
            inside: response.memberPersonality.inside == 0 ? false : true,
            quiet: response.memberPersonality.quiet == 0 ? false : true,
            live_long: response.memberPersonality.liveLong == 0 ? false : true,
            live_short: response.memberPersonality.liveShort == 0 ? false : true,
            pet: response.memberPersonality.pet == 0 ? false : true,
            cold: response.memberPersonality.cold == 0 ? false : true,
            hot: response.memberPersonality.hot == 0 ? false : true,
            host_house_prefer: response.memberPersonality.hostHousePrefer,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  // MapBox.tsx 마운트 시 최초 1회 fetch (집 리스트)
  useEffect(() => {
    loadMemberInfo()
      .then(() => {
        fetchFirstData().then(() => {
          setIsMounted(true);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (isMounted) {
      loadMap();
    }
  }, [isMounted]);

  useEffect(() => {
    console.log('homes 배열이 변경되어 호출되었습니다 : ', homes);
    loadMap();
  }, [homes]);

  useEffect(() => {
    if (headerFilterChanged) {
      fetchData();
    }
  }, [headerFilterChanged]);

  useEffect(() => {
    if (searchFilterChanged) {
      console.log('선택한 상세 필터로 조회 : ', filter_condition);
      fetchData();
    }
  }, [searchFilterChanged]);

  const makeClusterer = (map: any) => {
    console.log('클러스터를 생성합니다.');
    return new window.kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 3,
      minClusterSize: 1,
      calculator: [5, 15, 30, 100],
      styles: [
        {
          // 1 - 5 마커
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
          // 6개 이상 마커
          width: '45px',
          height: '45px',
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
          // 16개 이상 마커
          width: '55px',
          height: '55px',
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
          // 31개 이상 마커
          width: '65px',
          height: '65px',
          background: theme.palette.primary.main,
          borderRadius: '50%',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: '60px',
          opacity: '85%',
        },
        {
          // 101개 이상 마커
          width: '75px',
          height: '75px',
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
        center: new window.kakao.maps.LatLng(lat, lng),
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
        const center = newMap.getCenter();
        setCenterPosition(center.getLat(), center.getLng());
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
