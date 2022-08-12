import { useRef, useState, FormEvent } from 'react';
import { reviewAPI } from 'apis';
import styled from '@emotion/styled';
import {
  Input,
  DatePicker,
  Switch,
  Image,
  Button,
  message,
  InputRef,
  Form,
  UploadFile,
} from 'antd';
import { Banner } from 'components/molecule';
import { ImageUpload } from 'components/organism';
import { ValueOf } from 'types/utility';
import { objectToFormData, filesToFormData } from 'utils';
import imageUrl from 'constants/imageUrl';
import { useRouter } from 'next/router';

interface SubmitData {
  [key: string]: number | string | boolean;
}

const initialData: SubmitData = {
  exhibitionId: 0,
  date: '',
  title: '',
  content: '',
  isPublic: true,
};

interface SearchResult {
  exhibitionId: number;
  name: string;
  thumbnail: string;
}

const ReviewCreatePage = () => {
  const submitData = useRef<SubmitData>(initialData);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>();
  const [posterImage, setPosterImage] = useState(imageUrl.EXHIBITION_DEFAULT);
  const [isPublic, setIsPublic] = useState(true);
  const router = useRouter();

  const handleChange = (key: string, newValue: ValueOf<SubmitData>) => {
    submitData.current[key] = newValue;
  };

  const handleSearch = async (value: string) => {
    const isEmpty = !/\S/.test(value);
    if (isEmpty) {
      message.warning('한 글자 이상 입력해주세요.');
      setSearchResults([]);
      return;
    }

    try {
      const { exhibitions } = await reviewAPI.searchExhibition(value).then((res) => res.data.data);
      exhibitions.length === 0 && message.warning('검색 결과가 없습니다.');
      setSearchResults([...exhibitions]);
    } catch (error) {
      console.error('전시회 검색 에러'); // TODO: 에러 처리 로직 추가
    }
  }; // TODO: useClickAway 적용하여 searchResults 초기화

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // TODO: 제출 전, validation 검사 추가

    let formData = objectToFormData('data', submitData.current);
    formData = filesToFormData('files', files, formData);

    try {
      await reviewAPI.createReview(formData);
      message.success('후기 작성이 완료되었습니다.');
      router.replace('/community');
    } catch (error) {
      console.error('후기 생성 실패');
    }
  };

  return (
    <>
      <Section>
        <Banner
          title="후기 쓰기"
          content="전시회를 다녀오셨나요? \n 소중한 경험을 후기로 작성하고 공유해보세요:)"
        />
        <ReviewEditForm layout="vertical">
          <Form.Item label="다녀 온 전시회">
            <OuterContainer>
              <InnerContainer>
                <SearchBar
                  placeholder="전시회 제목을 검색해 주세요."
                  enterButton
                  onSearch={handleSearch}
                />
                <ResultList>
                  {searchResults &&
                    searchResults.map(({ exhibitionId, name, thumbnail }) => (
                      <ResultItem
                        key={exhibitionId}
                        onClick={() => {
                          handleChange('exhibitionId', exhibitionId);
                          setPosterImage(thumbnail);
                        }}
                      >
                        {name}
                      </ResultItem>
                    ))}
                </ResultList>
              </InnerContainer>
              <Poster src={posterImage} alt="전시회 포스터 이미지" />
            </OuterContainer>
          </Form.Item>
          <Form.Item label="다녀 온 날짜">
            <DateInput
              onChange={(value) => {
                value && handleChange('date', value.format('YYYY-MM-DD'));
              }}
            />
          </Form.Item>
          <Form.Item label="제목">
            <Input
              placeholder="제목을 입력해주세요."
              showCount
              maxLength={30}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="내용">
            <TextArea
              placeholder="내용을 입력해주세요."
              autoSize
              onChange={(e) => handleChange('content', e.target.value)}
            />
          </Form.Item>
          <Form.Item label="사진">
            <ImageUpload fileList={files} setFileList={setFiles} />
          </Form.Item>
          <Form.Item label="공개 여부">
            <ToggleSwitch
              defaultChecked
              onChange={(checked) => {
                handleChange('isPublic', checked);
                setIsPublic(checked);
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

const OuterContainer = styled.div`
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

export default ReviewCreatePage;
