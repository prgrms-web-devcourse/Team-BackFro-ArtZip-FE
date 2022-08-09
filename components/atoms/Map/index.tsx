import React, { useEffect } from 'react';
import * as S from './style';
interface MapProps {
  lat: number;
  lng: number;
  width: number;
  height: number;
  title: string;
  address: string;
}
const Map = ({ lat, lng, width, height, title, address }: MapProps) => {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);

        const iwContent = `<div class="map-info-text"><div class="title"><strong>${title}</strong></div> <div>${address}</div> <div class="more-info"><a href="https://map.kakao.com/link/map/${title},${lat},${lng}" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${title},${lat},${lng}" target="_blank">길찾기</a></div></div>`,
          iwPosition = new window.kakao.maps.LatLng(lat, lng); //인포윈도우 표시 위치입니다

        const infowindow = new window.kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
        });
        infowindow.open(map, marker);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [lat, lng]);
  return (
    <S.Map width={width} height={height}>
      <div id="map" />
    </S.Map>
  );
};

export default Map;
