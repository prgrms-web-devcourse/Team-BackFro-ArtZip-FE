import Map from 'components/atoms/Map';
import ExhibitionCard from 'components/molecule/ExhibitionCard';
import SwiperWrapper from 'components/organism/Swiper';
import SwiperContainer from 'components/organism/SwiperContainer';
import type { NextPage } from 'next';
import { homeStyle as S } from '../styles/pages';
import React, { useEffect, useState } from 'react';
import { exhibitionAPI } from 'apis';
import { ExhibitionProps } from 'types/model';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';

const Home: NextPage = () => {
  const [upcomingExhibitions, setUpcomingExhibitions] = useState<ExhibitionProps[]>([]);
  const [mostLikeExhibitions, setMostLikeExhibitions] = useState<ExhibitionProps[]>([]);

  const userState = useRecoilValue(userAtom);

  console.log('user', userState);
  useEffect(() => {
    exhibitionAPI.getUpcoming(0, 8).then((res) => {
      setUpcomingExhibitions(res.data.data.content);
    });

    exhibitionAPI.getMostLike(0, 8, true).then((res) => {
      setMostLikeExhibitions(res.data.data.content);
    });
  }, []);
  return (
    <div>
      <SwiperContainer title="다가오는 전시회" type="upcoming">
        <SwiperWrapper items={upcomingExhibitions} />
      </SwiperContainer>

      <SwiperContainer title="인기많은 전시회" type="popular">
        <SwiperWrapper items={mostLikeExhibitions} />
      </SwiperContainer>

      <S.MapContainer>
        <Map
          title={'프로그래머스'}
          lat={37.491806}
          lng={127.029933}
          width={800}
          height={500}
          address={'서울특별시 서초구 서초동 강남대로 327'}
        />
      </S.MapContainer>
    </div>
  );
};

export default Home;
