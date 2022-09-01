import { useRef, useState, FormEvent, useEffect } from 'react';
import { reviewAPI } from 'apis';
import styled from '@emotion/styled';
import { Input, DatePicker, Switch, Image, Button, message, Form, UploadFile } from 'antd';
import { Banner } from 'components/molecules';
import { ImageUpload } from 'components/organisms';
import { convertObjectToFormData, convertFilesToFormData, getErrorMessage } from 'utils';
import imageUrl from 'constants/imageUrl';
import { useRouter } from 'next/router';
import { useClickAway, useWithAuth } from 'hooks';
import { Spinner } from 'components/atoms';

interface SubmitData {
  exhibitionId: number;
  date: string;
  title: string;
  content: string;
  isPublic: boolean;

  // [key: string]: number | string | boolean;
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
  const { query } = router;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (query.exhibitionId) {
      submitData.current['exhibitionId'] = Number(query.exhibitionId);
      setPosterImage(query.thumbnail as string);
    }
  }, [router.isReady]);

  const searchContainer = useRef<HTMLDivElement>(null);
  const resultList = useRef<HTMLUListElement>(null);

  useClickAway(searchContainer, () => {
    if (resultList.current) {
      resultList.current.style.visibility = 'hidden';
    }
  });

  // const handleChange = (key: string, newValue: ValueOf<SubmitData>) => {
  //   submitData.current[key] = newValue;
  // };

  const handleSearch = async (value: string) => {
    const isEmpty = !/\S/.test(value);
    if (isEmpty) {
      message.warning('한 글자 이상 입력해주세요.');
      setSearchResults([]);
      return;
    }

    try {
      const { exhibitions } = await reviewAPI.searchExhibition(value).then((res) => res.data.data); // TODO: await과 .then을 함께 쓰지 않기
      exhibitions.length === 0 && message.warning('검색 결과가 없습니다.');
      setSearchResults([...exhibitions]);

      if (resultList.current) {
        resultList.current.style.visibility = 'visible';
      }
    } catch (error) {
      console.error('전시회 검색 에러'); // TODO: 에러 처리 로직 추가
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // TODO: 제출 전 validation 검사 추가
    // required, 다녀 온 날짜 < 오늘 날짜

    let formData = convertObjectToFormData('data', submitData.current);
    formData = convertFilesToFormData('files', files, formData);

    try {
      await reviewAPI.createReview(formData);
      message.success('후기 작성이 완료되었습니다.');
      router.replace('/community');
    } catch (error) {
      message.error(getErrorMessage(error));
      console.error(error);
    }
  };

  const [isChecking] = useWithAuth();
  if (isChecking) {
    return <Spinner />;
  }

  return (
    <>
      <Banner
        subtitle="Art.zip 후기 작성"
        title="전시회 다녀오셨나요?"
        content="소중한 경험을 후기로 작성하세요 !"
      />
      <Section>
        <ReviewEditForm layout="vertical">
          <Form.Item label="다녀 온 전시회">
            <SearchContainer ref={searchContainer}>
              <InnerContainer>
                <SearchBar
                  placeholder="전시회 제목을 검색해 주세요."
                  enterButton
                  onSearch={handleSearch}
                  defaultValue={query.name}
                />
                <ResultList ref={resultList}>
                  {searchResults?.map(({ exhibitionId, name, thumbnail }) => (
                    <ResultItem
                      key={exhibitionId}
                      onClick={() => {
                        submitData.current['exhibitionId'] = exhibitionId;
                        setPosterImage(thumbnail);
                      }}
                    >
                      {name}
                    </ResultItem>
                  ))}
                </ResultList>
              </InnerContainer>
              <Poster
                src={posterImage}
                alt="전시회 포스터 이미지"
                preview={posterImage !== imageUrl.EXHIBITION_DEFAULT}
              />
            </SearchContainer>
          </Form.Item>
          <Form.Item label="다녀 온 날짜">
            <DateInput
              onChange={(value) => {
                if (value) {
                  submitData.current['date'] = value.format('YYYY-MM-DD');
                }
              }}
            />
          </Form.Item>
          <Form.Item label="제목">
            <Input
              placeholder="제목을 입력해주세요."
              showCount
              maxLength={30}
              onChange={(e) => (submitData.current['title'] = e.target.value)}
            />
          </Form.Item>
          <Form.Item label="내용">
            <TextArea
              placeholder="내용을 입력해주세요."
              autoSize
              onChange={(e) => (submitData.current['content'] = e.target.value)}
            />
          </Form.Item>
          <Form.Item label="사진">
            <ImageUpload fileList={files} setFileList={setFiles} limit={9} />
          </Form.Item>
          <Form.Item label="공개 여부">
            <ToggleSwitch
              defaultChecked
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
  );
};
// TODO: 작성완료 버튼 연타 방어 코드

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

export default ReviewCreatePage;
