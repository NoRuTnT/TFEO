import React, { useEffect, useState } from 'react';
import '../../styles/home/MapBox.css';
import { theme } from '../../styles/Theme';

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
  oneroom: { lat: 37.566022, lng: 126.977969 }, // 배열이 아닌 객체로 수정합니다.
};

interface Props {
  lat: number;
  lng: number;
}

export default function MapBox({ lat, lng }: Props) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    console.log(lat, lng); // 전달받은 위도와 경도를 확인합니다.
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');

      // 지도의 중심을 전달받은 위도와 경도로 설정합니다.
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: 4,
        minLevel: 1,
      };

      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);

      const imageSrc = '/assets/icons/homeLocation.png'; // 마커 이미지 URL
      const imageSize = new window.kakao.maps.Size(60, 80); // 마커 이미지 크기 설정
      const imageOption = { offset: new window.kakao.maps.Point(15, 30) }; // 마커 이미지 옵션 설정

      // 마커 이미지를 생성합니다.
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      // 마커의 위치를 전달받은 위도와 경도로 설정합니다.
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        image: markerImage, // 마커에 이미지 설정
      });

      marker.setMap(newMap); // 마커를 지도에 추가합니다.
    });
  }, [lat, lng]); // lat와 lng 값이 변경될 때마다 useEffect를 다시 실행합니다.

  return <div className="mapbox" id="map" style={{ width: '100%', height: '300px' }}></div>;
}
