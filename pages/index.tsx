import Map from 'components/atoms/Map';
import ExhibitionCard from 'components/molecules/ExhibitionCard';
import SwiperWrapper from 'components/organisms/Swiper';
import SwiperContainer from 'components/organisms/SwiperContainer';
import type { NextPage } from 'next';
import { homeStyle as S } from '../styles/pages';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { exhibitionAPI } from 'apis';
import { ExhibitionProps } from 'types/model';

const Home: NextPage = () => {
  const [upcomingExhibitions, setUpcomingExhibitions] = useState<ExhibitionProps[]>([]);
  const [mostLikeExhibitions, setMostLikeExhibitions] = useState<ExhibitionProps[]>([]);

  useEffect(() => {
    exhibitionAPI.getUpcoming(0, 8).then((res) => {
      setUpcomingExhibitions(res.data.data.content);
    });

    exhibitionAPI.getMostLike(0, 8, true).then((res) => {
      setMostLikeExhibitions(res.data.data.content);
    });
  }, []);
  return (
    <>
      <Head>
        <title>ArtZip | Home</title>
      </Head>
      <div>
        <SwiperContainer title="다가오는 전시회" type="upcoming">
          <SwiperWrapper items={upcomingExhibitions} />
        </SwiperContainer>

        <SwiperContainer title="인기많은 전시회" type="popular">
          <SwiperWrapper items={mostLikeExhibitions} />
        </SwiperContainer>
      </div>
    </>
  );
};

export default Home;
