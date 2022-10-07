import styled from '@emotion/styled';
import { Banner } from 'components/molecules';
import { useRouter } from 'next/router';
import { useCheckAuth, useDraftReview } from 'hooks';
import { Spinner } from 'components/atoms';
import { ReviewEditForm } from 'components/organisms';
import { useEffect, useState } from 'react';
import { Modal } from 'antd';

const ReviewCreatePage = () => {
  const { query } = useRouter();
  const [prevData, setPrevData] = useState(query);
  const [draftReview, setDraftReview, removeDraftReview] = useDraftReview();
  const [isModalOn, setIsModalOn] = useState(false);
  const [isPrevDataChanged, setIsPrevDataChanged] = useState(false);

  useEffect(() => {
    if (query.exhibitionId) {
      removeDraftReview();
    } else if (draftReview.exhibitionId) {
      setIsModalOn(true);
    }
  }, []);

  const handleModalOk = () => {
    setPrevData(draftReview);
    setIsModalOn(false);
    setIsPrevDataChanged(true);
  };

  const handleModalCancel = () => {
    removeDraftReview();
    setIsModalOn(false);
  };

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
            prevData.exhibitionId
              ? {
                  exhibitionId: Number(prevData.exhibitionId),
                  exhibitionName: prevData.exhibitionName as string,
                  exhibitionThumbnail: prevData.exhibitionThumbnail as string,
                  date: prevData.date ? (prevData.date as string) : '',
                  title: prevData.title ? (prevData.title as string) : '',
                  content: prevData.content ? (prevData.content as string) : '',
                  isPublic: prevData.isPublic !== undefined ? !!prevData.isPublic : true,
                }
              : undefined
          }
          isPrevDataChanged={isPrevDataChanged}
          setDraftReview={setDraftReview}
          removeDraftReview={removeDraftReview}
        />
      </Section>
      <Modal
        title="불러오기"
        visible={isModalOn}
        okText="예"
        onOk={handleModalOk}
        cancelText="아니오"
        onCancel={handleModalCancel}
      >
        <p>임시 저장된 글이 있습니다. 불러올까요?</p>
      </Modal>
    </>
  );
};

const Section = styled.section`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.8rem;
`;

export default ReviewCreatePage;
