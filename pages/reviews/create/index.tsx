import styled from '@emotion/styled';
import { Banner } from 'components/molecules';
import { useRouter } from 'next/router';
import { useCheckAuth } from 'hooks';
import { Spinner } from 'components/atoms';
import { ReviewEditForm } from 'components/organisms';

const ReviewCreatePage = () => {
  const router = useRouter();
  const { query } = router;

  const [isChecking] = useCheckAuth();
  return isChecking ? (
    <Spinner />
  ) : (
    <>
      <Banner
        subtitle="Art.zip 후기 작성"
        title="전시회 다녀오셨나요?"
        content="소중한 경험을 후기로 작성하세요!"
      />
      <Section>
        <ReviewEditForm
          type="create"
          prevData={
            query.exhibitionId
              ? {
                  exhibitionId: Number(query.exhibitionId),
                  exhibitionName: query.name as string,
                  exhibitionThumbnail: query.thumbnail as string,
                }
              : undefined
          }
        />
      </Section>
    </>
  );
};

const Section = styled.section`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.8rem;
`;

export default ReviewCreatePage;
