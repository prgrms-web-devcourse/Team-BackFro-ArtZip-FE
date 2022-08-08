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
  DatePickerProps,
  UploadFile,
} from 'antd';
import { Banner } from 'components/molecule';
import { ImageUpload } from 'components/organism';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { reviewAPI } from 'apis';
import axios from 'axios';

interface ResultItem {
  exhibitionId: number;
  name: string;
  thumbnail: string;
}

interface DataToSubmit {
  exhibitionId: number;
  date: string;
  title: string;
  content: string;
  isPublic: boolean;
}

const initialData: DataToSubmit = {
  exhibitionId: 1,
  date: '',
  title: '',
  content: '',
  isPublic: true,
};

const ReviewCreatePage = () => {
  const dataToSubmit = useRef<DataToSubmit>(initialData);
  const [resultList, setResultList] = useState<ResultItem[]>();
  const [isPublic, setIsPublic] = useState(true);
  const [url, setUrl] = useState(
    'https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg',
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [test, setTest] = useState<FileList>();

  const searchBarRef = useRef<InputRef>(null);

  const handleSearch = async (value: string) => {
    if (!/\S/.test(value)) {
      message.warning('한 글자 이상 입력해주세요.');
      setResultList([]);
    }
    const {
      data: { exhibitions },
      status,
    } = await reviewAPI.searchExhibition(value).then((res) => res.data);
    console.log(exhibitions, status);
    setResultList([...exhibitions]);
  };

  const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    dataToSubmit.current.date = dateString;
    console.log(dataToSubmit.current);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dataToSubmit.current.title = e.target.value;
    console.log(dataToSubmit.current);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dataToSubmit.current.content = e.target.value;
    console.log(dataToSubmit.current);
  };

  const handleSwitchChange = (checked: boolean) => {
    dataToSubmit.current.isPublic = checked;
    console.log(dataToSubmit.current);
    setIsPublic(checked);
  };

  const handleExhibitionClick = (id: number, thumbnail: string) => {
    setUrl(thumbnail);
    dataToSubmit.current.exhibitionId = id;
    console.log(dataToSubmit.current);
  };

  useEffect(() => {
    console.log('hello', fileList);
  }, [fileList]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = await toFormData();

    for (const key of formData.keys()) {
      console.log(key);
    }

    for (const value of formData.values()) {
      console.log(value);
    }

    const result = await axios.post('https://server.artzip.shop/api/v1/reviews', formData, {
      headers: {
        accessToken: '',
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(result);
  };

  const toFormData = async () => {
    const formData = new FormData();

    if (test) {
      for (let i = 0; i < test.length; i++) {
        formData.append('files', test[i]);
      }
    }

    formData.append(
      'data',
      new Blob([JSON.stringify({ ...dataToSubmit.current })], { type: 'application/json' }),
    );

    return formData;
  };

  const handleTest = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    if (e.target.files) {
      setTest(e.target.files);
    }
  };

  useEffect(() => {
    console.log('test', test);
  }, [test]);

  return (
    <>
      <Section>
        <Banner
          title="후기 쓰기"
          content="전시회를 다녀오셨나요? \n 소중한 경험을 후기로 작성하고 공유해보세요:)"
        />
        <ReviewEditForm layout="vertical">
          <Form.Item name="exhibitionId" label="다녀 온 전시회">
            <OuterContainer>
              <InnerContainer>
                <SearchBar
                  placeholder="전시회 제목을 검색해 주세요."
                  enterButton
                  onSearch={handleSearch}
                  ref={searchBarRef}
                />
                <ResultList>
                  {resultList &&
                    resultList.map(({ exhibitionId, name, thumbnail }) => (
                      <ResultItem
                        key={exhibitionId}
                        onClick={() => handleExhibitionClick(exhibitionId, thumbnail)}
                      >
                        {name}
                      </ResultItem>
                    ))}
                </ResultList>
              </InnerContainer>
              <Poster src={url} alt="전시회 포스터 이미지" />
            </OuterContainer>
          </Form.Item>

          <Form.Item name="date" label="다녀 온 날짜">
            <DateInput onChange={handleDateChange} />
          </Form.Item>

          <Form.Item name="title" label="제목">
            <Input
              placeholder="제목을 입력해주세요."
              showCount
              maxLength={30}
              onChange={handleTitleChange}
            />
          </Form.Item>

          <Form.Item name="content" label="내용">
            <TextArea placeholder="내용을 입력해주세요." autoSize onChange={handleContentChange} />
          </Form.Item>

          <Form.Item name="files" label="사진">
            <ImageUpload fileList={fileList} setFileList={setFileList} />
          </Form.Item>

          <Form.Item name="isPublic" label="공개 여부">
            <ToggleSwitch defaultChecked onChange={handleSwitchChange} />
            {isPublic ? '전체 공개' : '비공개'}
          </Form.Item>

          <input type="file" onChange={handleTest} />

          <SubmitButton type="primary" htmlType="submit" onClick={handleSubmit}>
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

const Fieldset = styled.fieldset``;

const Legend = styled.legend`
  font-size: 2.8rem;
  font-weight: bold;
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

const ImageWrapper = styled.div`
  height: 200px;
  flex-shrink: 0;
`;

const Label = styled.label`
  font-size: 2.8rem;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 6px;
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
`;

const SubmitButton = styled(Button)`
  width: 200px;
  height: 40px;
  border-radius: 6px;
  margin: 30px auto 0;
  font-size: 1.8rem;
`;

export default ReviewCreatePage;
