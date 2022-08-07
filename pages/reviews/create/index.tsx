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
} from 'antd';
import { Banner } from 'components/molecule';
import { ImageUpload } from 'components/organism';
import { useRef, useState } from 'react';

const ReviewCreatePage = () => {
  const searchBarRef = useRef<InputRef>(null);
  const [isPublic, setIsPublic] = useState(true);

  const handleSearch = (searchWord: string) => {
    if (!/\S/.test(searchWord)) {
      message.warning('한 글자 이상 입력해주세요.');

      if (searchBarRef.current) {
        searchBarRef.current.input!.value = '';
      }
    }
    console.log(searchWord);
  };

  const handleSwitchChange = (checked: boolean) => {
    setIsPublic(checked);
  };

  const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

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
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                </ResultList>
              </InnerContainer>
              <Poster
                src="https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg"
                alt="전시회 포스터 이미지"
              />
            </OuterContainer>
          </Form.Item>

          <Form.Item name="date" label="다녀 온 날짜">
            <DateInput onChange={handleDateChange} />
          </Form.Item>

          <Form.Item name="title" label="제목">
            <Input placeholder="제목을 입력해주세요." showCount maxLength={30} />
          </Form.Item>

          <Form.Item name="content" label="내용">
            <TextArea placeholder="내용을 입력해주세요." autoSize />
          </Form.Item>

          <Form.Item name="isPublic" label="공개 여부">
            <ToggleSwitch defaultChecked onChange={handleSwitchChange} />
            {isPublic ? '전체 공개' : '비공개'}
          </Form.Item>

          {/* <Label>제목</Label>
          <Input placeholder="제목을 입력해주세요." showCount maxLength={30} />
          <Label>내용</Label>
          <TextArea placeholder="내용을 입력해주세요." autoSize />
          <Label>사진</Label>
          <ImageUpload />
          <Label>공개 여부</Label>
          <ToggleSwitch defaultChecked onChange={handleSwitchChange} />
          {isPublic ? '전체 공개' : '비공개'} */}

          <SubmitButton type="primary" htmlType="submit">
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
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.border.light};
  position: relative;
  top: -9px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.white};
`;

const ResultItem = styled.li`
  font-size: 1.6rem;
  cursor: pointer;
`;

const Poster = styled(Image)`
  width: 150px;
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
