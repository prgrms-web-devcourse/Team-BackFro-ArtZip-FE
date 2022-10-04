import { useRef, useState, useEffect } from 'react';
import { reviewAPI } from 'apis';
import styled from '@emotion/styled';
import { Input, DatePicker, Switch, Image, Button, message, Form, Modal, UploadFile } from 'antd';
import { Banner } from 'components/molecules';
import { ExhibitionSearchBar, ImageUpload } from 'components/organisms';
import {
  convertObjectToFormData,
  convertFilesToFormData,
  getErrorMessage,
  validateReviewEditForm,
} from 'utils';
import { useRouter } from 'next/router';
import { useCheckAuth, useDebounce } from 'hooks';
import moment from 'moment';
import { PhotoProps } from 'types/model';
import { Spinner } from 'components/atoms';
import { SubmitData } from 'pages/reviews/create';
import useSWR from 'swr';
import { ValueOf } from 'types/utility';
import Head from 'next/head';

const initialData: SubmitData = {
  exhibitionId: 0,
  date: '',
  title: '',
  content: '',
  isPublic: true,
  deletedPhotos: [],
};
Object.freeze(initialData);

const ReviewUpdatePage = () => {
  const submitData = useRef<SubmitData>({ ...initialData });
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [prevImages, setPrevImages] = useState<PhotoProps[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const clickedImage = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: prevData, mutate } = useSWR(`api/v1/reviews/${router.query.id}`);

  useEffect(() => {
    if (prevData) {
      submitData.current = {
        exhibitionId: prevData.exhibition.exhibitionId,
        date: prevData.date,
        title: prevData.title,
        content: prevData.content,
        isPublic: prevData.isPublic,
        deletedPhotos: [],
      };
      setPrevImages(prevData.photos);
    }
  }, [prevData]);

  const handleImageClick = (photoId: number) => {
    clickedImage.current = photoId;
    setIsModalVisible(true);
  };

  const handleImageDelete = () => {
    const photoId = clickedImage.current;
    const { deletedPhotos } = submitData.current;
    deletedPhotos && (deletedPhotos as number[]).push(photoId);
    setPrevImages(prevImages.filter((image) => image.photoId !== photoId));
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    clickedImage.current = 0;
    setIsModalVisible(false);
  };

  const handleChange = (key: string, value: ValueOf<SubmitData>) => {
    submitData.current[key] = value;
  };

  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    if (isChecking) {
      return;
    }

    const data = submitData.current;
    if (!isLoading && validateReviewEditForm(data)) {
      setIsLoading(true);
      let formData = convertObjectToFormData('data', data);
      formData = convertFilesToFormData('files', files, formData);

      try {
        await reviewAPI.updateReview(Number(router.query.id), formData);
        message.success('후기 수정이 완료되었습니다.');
        router.replace('/community');
        mutate(
          {
            ...prevData,
            date: data.date,
            title: data.title,
            content: data.content,
            isPublic: data.isPublic,
            photos: [...prevImages],
          },
          {
            revalidate: false,
          },
        );
      } catch (error) {
        message.error(getErrorMessage(error));
        console.error(error);
      }
      setIsLoading(false);
    }
  };
  const [debounceRef] = useDebounce(handleSubmit, 300, null, 'click');

  const [isChecking] = useCheckAuth();
  if (isChecking) {
    return <Spinner />;
  }

  if (!prevData) {
    return null;
  }

  return (
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
          <ReviewEditForm layout="vertical">
            <FormItem label="다녀 온 전시회">
              <ExhibitionSearchBar
                prevData={{
                  name: prevData.exhibition.name,
                  thumbnail: prevData.exhibition.thumbnail,
                }}
              />
            </FormItem>
            <FormItem label="다녀 온 날짜">
              <DateInput
                onChange={(value) => {
                  value && handleChange('date', value.format('YYYY-MM-DD'));
                }}
                defaultValue={moment(prevData.date, 'YYYY-MM-DD')}
              />
            </FormItem>
            <FormItem label="제목">
              <Input
                placeholder="제목을 입력해주세요."
                showCount
                maxLength={30}
                onChange={(e) => {
                  handleChange('title', e.target.value);
                }}
                defaultValue={prevData.title}
              />
            </FormItem>
            <FormItem label="내용">
              <TextArea
                placeholder="내용을 입력해주세요."
                autoSize
                onChange={(e) => {
                  handleChange('content', e.target.value);
                }}
                defaultValue={prevData.content}
              />
            </FormItem>
            <FormItem label="사진">
              <PrevImageContainer>
                {prevImages.map(({ photoId, path }) => (
                  <Image
                    key={photoId}
                    src={path}
                    alt="previous image"
                    width={104}
                    height={104}
                    preview={false}
                    onClick={() => handleImageClick(photoId)}
                  />
                ))}
              </PrevImageContainer>
              <ImageUpload fileList={files} setFileList={setFiles} limit={9 - prevImages.length} />
            </FormItem>
            <FormItem label="공개 여부">
              <ToggleSwitch
                defaultChecked={prevData.isPublic}
                onChange={(checked) => {
                  handleChange('isPublic', checked);
                  setIsPublic(checked);
                }}
              />
              {isPublic ? '전체 공개' : '비공개'}
            </FormItem>

            <SubmitButton type="primary" ref={debounceRef}>
              작성완료
            </SubmitButton>
          </ReviewEditForm>
        </Section>
        <Modal
          title="이미지 삭제"
          visible={isModalVisible}
          okText="삭제하기"
          onOk={handleImageDelete}
          cancelText="취소"
          onCancel={handleModalCancel}
        >
          <p>이 이미지를 삭제할까요?</p>
        </Modal>
      </>
    </>
  );
};

const Section = styled.section`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.8rem;
`;

const ReviewEditForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 50px 0;

  label {
    font-size: 2rem;
    font-weight: bold;
  }
`;

const FormItem = styled(Form.Item)`
  label[title='사진']::after {
    content: '(optional)';
    display: inline;
    color: ${({ theme }) => theme.color.font.dark};
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 2px;
    margin-left: 4px;
  }
`;

const DateInput = styled(DatePicker)`
  width: 200px;

  & > input {
    font-size: 1.6rem;
  }
`;

const TextArea = styled(Input.TextArea)``;

const ToggleSwitch = styled(Switch)`
  width: 54px;
  margin-right: 14px;
`;

const SubmitButton = styled(Button)`
  width: 200px;
  height: 40px;
  border-radius: 6px;
  margin: 30px auto 0;
  font-size: 1.8rem;
`;

const PrevImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 104px);
  gap: 8px;
  margin-bottom: 8px;

  img {
    cursor: pointer;
  }
`;

export default ReviewUpdatePage;
