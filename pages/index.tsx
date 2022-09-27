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
import axios from 'axios';

interface HomeProps {
  upcomingExhibitions: Required<ExhibitionProps>[];
  mostLikeExhibitions: Required<ExhibitionProps>[];
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = context.req.cookies['ACCESS_TOKEN'];

  const headers = {
    ...(accessToken ? { accessToken: accessToken } : {}),
  };

  const getUpcoming = axios.get(
    `${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/exhibitions/upcoming?page=0&size=8`,
    {
      headers,
    },
  );

  const getMostLike = axios.get(
    `${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/exhibitions/mostlike?page=0&size=8&include-end=true`,
    {
      headers,
    },
  );

  const [upcomingExhibitionRes, mostLikeExhibitionRes] = await Promise.all([
    getUpcoming,
    getMostLike,
  ]);

  return {
    props: {
      upcomingExhibitions: upcomingExhibitionRes.data.data.content,
      mostLikeExhibitions: mostLikeExhibitionRes.data.data.content,
    },
  };
};

export default Home;
