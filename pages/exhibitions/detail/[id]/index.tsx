import Head from 'next/head';
import ReviewCard from 'components/molecules/ReviewCard';
import { exhibitionsStyle as S } from '../../../../styles/pages';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ExhibitionDetail } from 'components/organisms';
import { GetServerSidePropsContext } from 'next';
import { exhibitionAPI } from 'apis';
import { ExhibitionSingleData } from 'types/apis/exhibition';
import Map from 'components/atoms/Map';
import { useEffect, useState } from 'react';
import { message } from 'antd';

const ExhibitionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [exhibitionData, setExhibitionData] = useState<ExhibitionSingleData>();
  useEffect(() => {
    const getData = async () => {
      const { data } = await exhibitionAPI.getDetail(Number(id));
      setExhibitionData(data.data);
    };

    getData();
  }, []);

  return (
    <>
      <Head>
        <title>ArtZip | ExhibitionDetail</title>
      </Head>
      {exhibitionData && (
        <S.ExhibitionPageContainer>
          <ExhibitionDetail exhibitionDetail={exhibitionData}></ExhibitionDetail>
          <h3>전시 소개</h3>
          <S.DescriptionWrapper>{exhibitionData.description}</S.DescriptionWrapper>
          <h3>위치 안내</h3>
          <S.PlaceInfo>
            장소 | {exhibitionData.placeAddress}{' '}
            {
              <S.StyledCopyButton>
                <S.Clipboard
                  onClick={() => {
                    navigator.clipboard.writeText(exhibitionData.placeAddress);
                    message.success('클립보드에 복사되었습니다.');
                  }}
                ></S.Clipboard>
              </S.StyledCopyButton>
            }
          </S.PlaceInfo>
          <Map
            lat={exhibitionData.lat}
            lng={exhibitionData.lng}
            width={800}
            height={450}
            title={'지도'}
            address={exhibitionData.placeAddress}
          />
          <h3>후기({exhibitionData.reviewCount}개)</h3>
          {exhibitionData.reviews && (
            <S.ReviewContainer>
              {exhibitionData.reviews.map((review) => (
                <ReviewCard
                  key={review.reviewId}
                  data={review}
                  thumbnail={exhibitionData.thumbnail}
                />
              ))}
            </S.ReviewContainer>
          )}
          {exhibitionData.reviewCount > 0 ? (
            <S.ButtonContainer>
              <Link href={`/community?exhibitionId=${exhibitionData.exhibitionId}`}>
                <S.StyledButton type="primary">후기 모두 보기</S.StyledButton>
              </Link>
              <Link
                href={{
                  pathname: `/reviews/create`,
                  query: {
                    exhibitionId: exhibitionData.exhibitionId,
                    exhibitionName: exhibitionData.name,
                    exhibitionThumbnail: exhibitionData.thumbnail,
                  },
                }}
                as={`/reviews/create`}
              >
                <S.StyledButton type="primary">후기 작성하기</S.StyledButton>
              </Link>
            </S.ButtonContainer>
          ) : (
            <S.ButtonWrapper>
              <Link
                href={{
                  pathname: `/reviews/create`,
                  query: {
                    exhibitionId: exhibitionData.exhibitionId,
                    exhibitionName: exhibitionData.name,
                    exhibitionThumbnail: exhibitionData.thumbnail,
                  },
                }}
                as={`/reviews/create`}
              >
                <S.StyledButton type="primary">후기 작성하기</S.StyledButton>
              </Link>
            </S.ButtonWrapper>
          )}
        </S.ExhibitionPageContainer>
      )}
    </>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!context.params) {
    return;
  }

  const { id } = context.params;
  const { data } = await exhibitionAPI.getDetail(Number(id));
  return {
    props: {
      data: data.data,
    },
  };
};

export default ExhibitionDetailPage;
