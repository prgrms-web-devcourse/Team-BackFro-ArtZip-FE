import { useRef, useState, useEffect } from 'react';
import { reviewAPI } from 'apis';
import styled from '@emotion/styled';
import { Input, DatePicker, Switch, Image, Button, message, Form, UploadFile } from 'antd';
import { Banner } from 'components/molecules';
import { ImageUpload } from 'components/organisms';
import {
  convertObjectToFormData,
  convertFilesToFormData,
  getErrorMessage,
  validateReviewEditForm,
  show,
  hide,
} from 'utils';
import imageUrl from 'constants/imageUrl';
import { useRouter } from 'next/router';
import { useClickAway, useWithAuth, useDebounceClick, useDebounceSearch } from 'hooks';
import { Spinner } from 'components/atoms';

export interface SubmitData {
  exhibitionId: number;
  date: string;
  title: string;
  content: string;
  isPublic: boolean;
  deletedPhotos?: number[];
}

const initialData: SubmitData = {
  exhibitionId: 0,
  date: '',
  title: '',
  content: '',
  isPublic: true,
};
Object.freeze(initialData);

interface SearchResult {
  exhibitionId: number;
  name: string;
  thumbnail: string;
}

const ReviewCreatePage = () => {
  const submitData = useRef<SubmitData>({ ...initialData });
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>();
  const [posterImage, setPosterImage] = useState(imageUrl.EXHIBITION_DEFAULT);
  const [isPublic, setIsPublic] = useState(true);
  const router = useRouter();
  const { query } = router;
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState('');

  useEffect(() => {
    if (query.exhibitionId) {
      submitData.current['exhibitionId'] = Number(query.exhibitionId);
      setPosterImage(query.thumbnail as string);
    }
  }, []);

  const resultList = useRef<HTMLUListElement>(null);

  const handleSearch = async () => {
    const isEmpty = !/\S/.test(searchWord);
    if (isEmpty) {
      setSearchResults([]);
      return;
    }

    try {
      const { data } = await reviewAPI.searchExhibition(searchWord);
      const { exhibitions } = data.data;
      setSearchResults([...exhibitions]);
      resultList.current && show(resultList.current);
      !exhibitions.length && message.warning('검색 결과가 없습니다.');
    } catch (error) {
      message.error(getErrorMessage(error));
      console.error(error);
    }
  };
  useDebounceSearch(handleSearch, 500, [searchWord]);

  const handleSubmit = async (e?: Event) => {
    e?.preventDefault();
    if (!isLoading && validateReviewEditForm(submitData.current)) {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };
  const [debounceRef] = useDebounceClick('click', handleSubmit, 300);

  const [isChecking] = useWithAuth();
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
        <ReviewEditForm layout="vertical">
          <FormItem label="다녀 온 전시회">
            <SearchContainer>
              <InnerContainer>
                <SearchBar
                  placeholder="전시회 제목을 검색해 주세요"
                  defaultValue={query.name}
                  onChange={(e) => setSearchWord(e.target.value)}
                  onFocus={() => {
                    resultList.current && show(resultList.current);
                  }}
                />
                <ResultList ref={resultList}>
                  {searchResults?.map(({ exhibitionId, name, thumbnail }) => (
                    <ResultItem
                      key={exhibitionId}
                      onClick={() => {
                        submitData.current['exhibitionId'] = exhibitionId;
                        setPosterImage(thumbnail);
                        resultList.current && hide(resultList.current);
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
          </FormItem>
          <FormItem label="다녀 온 날짜">
            <DateInput
              onChange={(value) => {
                if (value) {
                  submitData.current['date'] = value.format('YYYY-MM-DD');
                }
              }}
            />
          </FormItem>
          <FormItem label="제목">
            <Input
              placeholder="제목을 입력해주세요"
              showCount
              maxLength={30}
              onChange={(e) => (submitData.current['title'] = e.target.value)}
            />
          </FormItem>
          <FormItem label="내용">
            <TextArea
              placeholder="내용을 입력해주세요(1000자 이하)"
              autoSize
              onChange={(e) => (submitData.current['content'] = e.target.value)}
            />
          </FormItem>
          <FormItem label="사진">
            <ImageUpload fileList={files} setFileList={setFiles} limit={9} />
          </FormItem>
          <FormItem label="공개 여부">
            <ToggleSwitch
              defaultChecked
              onChange={(checked) => {
                submitData.current['isPublic'] = checked;
                setIsPublic(checked);
                console.log(submitData.current);
              }}
            />
            {isPublic ? '전체 공개' : '비공개'}
          </FormItem>

          <SubmitButton type="primary" ref={debounceRef}>
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
