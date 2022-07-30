import Head from 'next/head';
import styled from '@emotion/styled';

const CommunityPage = () => {
  return (
    <>
      <Head>
        <title>ArtZip | COMMUNITY</title>
      </Head>

      <div>
        <CommunityGuideBox>
          Art.zip에서 <br /> 다양한 전시회 후기를 만나보세요
        </CommunityGuideBox>

        {/* TODO: 무한 스크롤으로 피드 렌더링 */}
      </div>
    </>
  );
};

const CommunityGuideBox = styled.div`
  width: 100%;
  //TODO: 테마 색상으로 지정
  background-color: #9ba3eb;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 2rem;
  padding: 20px;
  color: #3c3c3c;
  font-weight: bold;
`;

export default CommunityPage;
