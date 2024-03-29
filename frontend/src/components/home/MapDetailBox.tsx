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
    console.log(lat);
    console.log(lng);
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');

      const options = {
        center: new window.kakao.maps.LatLng(dummyData.oneroom.lat, dummyData.oneroom.lng),
        level: 4,
        minLevel: 1,
      };

      const newMap = new window.kakao.maps.Map(container, options);
      setMap(newMap);

      const imageSrc = '/assets/icons/homeLocation.png'; // 변경하고자 하는 마커 이미지의 URL을 지정합니다.
      const imageSize = new window.kakao.maps.Size(60, 80); // 마커 이미지의 크기를 설정합니다.
      const imageOption = { offset: new window.kakao.maps.Point(15, 30) }; // 마커 이미지의 옵션을 설정합니다.

      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(dummyData.oneroom.lat, dummyData.oneroom.lng),
        image: markerImage, // 마커에 이미지를 설정합니다.
      });

      marker.setMap(newMap); // 클러스터러 대신에 직접 마커를 지도에 추가합니다.
    });
  }, []);

  return <div className="mapbox" id="map" style={{ width: '100%', height: '300px' }}></div>;
}
