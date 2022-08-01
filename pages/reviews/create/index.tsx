import Head from 'next/head';
import styled from '@emotion/styled';
import { Input, DatePicker, Switch, Image } from 'antd';
import { Banner } from 'components/molecule';
import { ImageUpload } from 'components/organism';

const ReviewCreatePage = () => {
  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <Head>
        <title>ArtZip | ReviewCreatePage</title>
      </Head>
      <Section>
        <Banner
          title="후기 쓰기"
          content="전시회를 다녀오셨나요? \n 소중한 경험을 후기로 작성하고 공유해보세요:)"
        />
        <Form>
          <Fieldset>
            <Legend>전시회 이름</Legend>
            <SearchContainer>
              <InnerContainer>
                <SearchBar
                  placeholder="전시회를 검색해 주세요."
                  allowClear
                  enterButton
                  onSearch={handleSearch}
                />
                <ResultList>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                  <ResultItem>서울 핸디아티코리아 2022</ResultItem>
                </ResultList>
              </InnerContainer>
              <ImageWrapper>
                <Image
                  src="https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg"
                  alt=""
                  height="100%"
                />
              </ImageWrapper>
            </SearchContainer>
          </Fieldset>
          <Label>다녀 온 날짜</Label>
          <DateInput />
          <Label>제목</Label>
          <Input placeholder="제목을 입력해주세요." showCount maxLength={30} />
          <Label>내용</Label>
          <TextArea placeholder="내용을 입력해주세요." autoSize />
          <Label>사진</Label>
          <ImageUpload />
          <Label>공개 여부</Label>
          <ToggleSwitch />

          <Button type="submit">작성완료</Button>
        </Form>
      </Section>
    </>
  );
};

const Section = styled.section`
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.8rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
`;

const Fieldset = styled.fieldset``;

const Legend = styled.legend`
  font-size: 2.8rem;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 240px;
  margin-right: 20px;
`;

const SearchBar = styled(Input.Search)`
  font-size: 1.6rem;
  height: 40px;
`;

const ResultList = styled.ul`
  width: 100%;
  max-height: 206px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.border.light};
  border-top: 0;
  position: relative;
  top: -6px;
  overflow-y: auto;
`;

const ResultItem = styled.li`
  font-size: 1.6rem;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  height: 240px;
  background-color: purple;
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

const Button = styled.button`
  display: inline;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.blue.dark};
`;

export default ReviewCreatePage;
