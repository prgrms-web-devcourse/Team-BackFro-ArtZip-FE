import Map from 'components/atoms/Map';
import ExhibitionCard from 'components/molecules/ExhibitionCard';
import SwiperWrapper from 'components/organisms/Swiper';
import SwiperContainer from 'components/organisms/SwiperContainer';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { homeStyle as S } from '../styles/pages';
import Head from 'next/head';
import { ExhibitionProps } from 'types/model';
import axios from 'axios';
import { authorizeFetch } from 'utils';
interface HomeProps {
  upcomingExhibitions: Required<ExhibitionProps>[];
  mostLikeExhibitions: Required<ExhibitionProps>[];
}
const Home: NextPage<HomeProps> = ({ upcomingExhibitions, mostLikeExhibitions }) => {
  return (
    <>
      <Head>
        <title>ArtZip | 홈페이지</title>
      </Head>
      <div>
        <SwiperContainer title="다가오는 전시회" type="upcoming">
          <SwiperWrapper items={upcomingExhibitions} type="upcoming" />
        </SwiperContainer>

        <SwiperContainer title="인기많은 전시회" type="popular">
          <SwiperWrapper items={mostLikeExhibitions} type="popular" />
        </SwiperContainer>
      </div>
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const accessToken = context.req.cookies['ACCESS_TOKEN'];
  const refreshToken = context.req.cookies['REFRESH_TOKEN'];

  const getUpcomingURL = `${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/exhibitions/upcoming?page=0&size=8`;
  const getMostLikeURL = `${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/exhibitions/mostlike?page=0&size=8&include-end=true`;

  if (accessToken && refreshToken) {
    const { data: upcomingExhibitionRes } = await authorizeFetch({
      accessToken,
      refreshToken,
      apiURL: getUpcomingURL,
    });
    const { data: mostLikeExhibitionRes } = await authorizeFetch({
      accessToken,
      refreshToken,
      apiURL: getMostLikeURL,
    });

    return {
      props: {
        upcomingExhibitions: upcomingExhibitionRes.content,
        mostLikeExhibitions: mostLikeExhibitionRes.content,
      },
    };
  }

  const getUpcoming = axios.get(getUpcomingURL);
  const getMostLike = axios.get(getMostLikeURL);

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
