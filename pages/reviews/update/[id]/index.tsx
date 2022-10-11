import styled from '@emotion/styled';
import { Banner } from 'components/molecules';
import { useRouter } from 'next/router';
import { useCheckAuth, useDraftReview } from 'hooks';
import { Spinner } from 'components/atoms';
import useSWR from 'swr';
import { ReviewEditForm } from 'components/organisms';
import { useEffect } from 'react';
import Head from 'next/head';

const ReviewUpdatePage = () => {
  const router = useRouter();
  const { data: prevData } = useSWR(`api/v1/reviews/${router.query.id}`);
  const [, , removeDraftReview] = useDraftReview();

  useEffect(() => {
    removeDraftReview();
  }, []);

  const [isChecking] = useCheckAuth();
  if (isChecking) {
    return <Spinner />;
  }

  return prevData ? (
    <>
      <Head>
        <title>ArtZip | 후기 수정</title>
      </Head>
      
      <>
        <Banner
          subtitle="Art.zip 후기 작성"
          title="전시회 다녀오셨나요?"
          content="소중한 경험을 후기로 작성하세요 !"
        />
        <Section>
          <ReviewEditForm
            type="update"
            prevData={{
              exhibitionId: prevData.exhibition.exhibitionId,
              exhibitionName: prevData.exhibition.name,
              exhibitionThumbnail: prevData.exhibition.thumbnail,
              date: prevData.date,
              title: prevData.title,
              content: prevData.content,
              isPublic: prevData.isPublic,
              photos: prevData.photos,
            }}
          />
        </Section>
      </>
    </>
  ) : null;
};

const Section = styled.section`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.8rem;
`;

export default ReviewUpdatePage;
