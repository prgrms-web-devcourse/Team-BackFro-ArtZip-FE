import { useRef, useState, FormEvent, useEffect } from 'react';
import { reviewAPI } from 'apis';
import styled from '@emotion/styled';
import { Input, DatePicker, Switch, Image, Button, message, Form, UploadFile } from 'antd';
import { Banner } from 'components/molecule';
import { ImageUpload } from 'components/organism';
import { ValueOf } from 'types/utility';
import { objectToFormData, filesToFormData } from 'utils';
import imageUrl from 'constants/imageUrl';
import { useRouter } from 'next/router';
import { useAxios, useClickAway } from 'hooks';
import moment from 'moment';
import { PhotoProps } from 'types/model';
import type { ReviewSingleReadData } from 'types/apis/review';

interface SubmitData {
  date: string;
  title: string;
  content: string;
  isPublic: boolean;
  deletedPhotos: number[];
}

const initialData: SubmitData = {
  date: '',
  title: '',
  content: '',
  isPublic: true,
  deletedPhotos: [],
};

const ReviewUpdatePage = () => {
  const submitData = useRef<SubmitData>(initialData);
  const [prevData, setPrevData] = useState<ReviewSingleReadData>();
  const [prevImage, setPrevImage] = useState<PhotoProps[]>([]);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  const router = useRouter();
  const { response } = useAxios(() => reviewAPI.getReviewSingle(Number(router.query.id)), []);

  useEffect(() => {
    if (response) {
      const { date, title, content, isPublic, photos } = response.data.data;

      submitData.current = {
        date,
        title,
        content,
        isPublic,
        deletedPhotos: [],
      };

      setPrevData(response.data.data);
      setPrevImage(photos);
    }
  }, [response]);

  const handleImageRemove = (photoId: number) => {
    console.log(photoId);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let formData = objectToFormData('data', submitData.current);
    formData = filesToFormData('files', files, formData);

    // for (const value of formData.values()) {
    //   console.log(value);
    // }

    try {
      const result = await reviewAPI.updateReview(Number(router.query.id), formData);
      console.log(result);
      // message.success('후기 수정이 완료되었습니다.');
      // router.replace('/community');
    } catch (error) {
      console.error('후기 수정 실패');
    }
  };

  return (
    files &&
    prevData && (
      <>
        <Banner
          subtitle="Art.zip 후기 작성"
          title="전시회 다녀오셨나요?"
          content="소중한 경험을 후기로 작성하세요 !"
        />
        <Section>
          <ReviewEditForm layout="vertical">
            <Form.Item label="다녀 온 전시회">
              <SearchContainer>
                <InnerContainer>
                  <SearchBar
                    placeholder="전시회 제목을 검색해 주세요."
                    enterButton
                    value={prevData.exhibition.name}
                  />
                </InnerContainer>
                <Poster src={prevData.exhibition.thumbnail} alt="전시회 포스터 이미지" />
              </SearchContainer>
            </Form.Item>
            <Form.Item label="다녀 온 날짜">
              <DateInput
                onChange={(value) => {
                  if (value) {
                    submitData.current['date'] = value.format('YYYY-MM-DD');
                  }
                }}
                defaultValue={moment(prevData.date, 'YYYY-MM-DD')}
              />
            </Form.Item>
            <Form.Item label="제목">
              <Input
                placeholder="제목을 입력해주세요."
                showCount
                maxLength={30}
                onChange={(e) => (submitData.current['title'] = e.target.value)}
                defaultValue={prevData.title}
              />
            </Form.Item>
            <Form.Item label="내용">
              <TextArea
                placeholder="내용을 입력해주세요."
                autoSize
                onChange={(e) => (submitData.current['content'] = e.target.value)}
                defaultValue={prevData.content}
              />
            </Form.Item>
            <Form.Item label="사진">
              <PrevImageContainer>
                {prevImage.map(({ photoId, path }) => (
                  <Image
                    key={photoId}
                    src={path}
                    alt="previous image"
                    width={104}
                    height={104}
                    preview={false}
                    onClick={() => handleImageRemove(photoId)}
                  />
                ))}
              </PrevImageContainer>
              <ImageUpload fileList={files} setFileList={setFiles} limit={5 - prevImage.length} />
            </Form.Item>
            <Form.Item label="공개 여부">
              <ToggleSwitch
                defaultChecked={prevData.isPublic}
                onChange={(checked) => {
                  submitData.current['isPublic'] = checked;
                  setIsPublic(checked);
                  console.log(submitData.current);
                }}
              />
              {isPublic ? '전체 공개' : '비공개'}
            </Form.Item>

            <SubmitButton type="primary" onClick={handleSubmit}>
              작성완료
            </SubmitButton>
          </ReviewEditForm>
        </Section>
      </>
    )
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

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 200px;
  margin-right: 20px;
`;

const SearchBar = styled(Input.Search)`
  font-size: 1.6rem;
  height: 40px;
  position: relative;
  z-index: 1;
`;

const ResultList = styled.ul`
  width: 100%;
  max-height: 168px;
  border: 1px solid ${({ theme }) => theme.color.border.light};
  position: relative;
  top: -9px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.white};
`;

const ResultItem = styled.li`
  font-size: 1.6rem;
  cursor: pointer;
  margin: 8px;
`;

const Poster = styled(Image)`
  width: 150px;
  height: 200px;
  flex-shrink: 0;
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
  img {
    cursor: pointer;
  }
`;

export default ReviewUpdatePage;
