import Map from 'components/atoms/Map';
import ExhibitionCard from 'components/molecules/ExhibitionCard';
import SwiperWrapper from 'components/organisms/Swiper';
import SwiperContainer from 'components/organisms/SwiperContainer';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { ExhibitionReadResponse } from 'types/apis/exhibition';
import { homeStyle as S } from '../styles/pages';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { exhibitionAPI } from 'apis';
import { ExhibitionProps } from 'types/model';

interface HomeProps {
  upcomingExhibitions: ExhibitionProps[];
  mostLikeExhibitions: ExhibitionProps[];
}
const Home: NextPage<HomeProps> = ({ upcomingExhibitions, mostLikeExhibitions }) => {
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

export const getServerSideProps = async () => {
  const upcomingExhibitionRes = await exhibitionAPI.getUpcoming(0, 8);
  const mostLikeExhibitionRes = await exhibitionAPI.getUpcoming(0, 8);

  return {
    props: {
      upcomingExhibitions: upcomingExhibitionRes.data.data.content,
      mostLikeExhibitions: mostLikeExhibitionRes.data.data.content,
    },
  };
};

export default Home;
