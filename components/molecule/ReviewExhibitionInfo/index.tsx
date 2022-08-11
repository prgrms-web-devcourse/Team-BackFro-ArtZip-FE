import Link from 'next/link';
import styled from '@emotion/styled';
import { Button, Image, Card } from 'antd';
import { ExhibitionProps } from 'types/model';
import { LinkOutlined } from '@ant-design/icons';

const ReviewExhibitionInfo = ({ exhibition }: { exhibition: ExhibitionProps }) => {
  const { exhibitionId, name, thumbnail } = exhibition;

  return (
    <ExhibitionInfoCard>
      <ExhibitionInfoContainer>
        <ExhibitionInfoImage
          src={thumbnail}
          preview={false}
          alt={`exhibition(${name}) info Image`}
        />

        <ExhibitionDetailContainer>
          <ExhibitionTextContainer>
            <ExhibitionLinkTitle>{name}</ExhibitionLinkTitle>
            <ExhibitionLinkPlainText> 정보가 궁금하다면? </ExhibitionLinkPlainText>
          </ExhibitionTextContainer>
          <ExhibitionLinkContainer>
            <Link href={`/exhibitions/detail/${exhibitionId}`}>
              <ExhibitionLinkButton type="ghost">
                <LinkOutlined />더 알아보기
              </ExhibitionLinkButton>
            </Link>
          </ExhibitionLinkContainer>
        </ExhibitionDetailContainer>
      </ExhibitionInfoContainer>
    </ExhibitionInfoCard>
  );
};

const ExhibitionInfoCard = styled(Card)`
  height: fit-content;
`;

const ExhibitionInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: fit-content;
  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;

const ExhibitionInfoImage = styled(Image)`
  object-fit: cover;
  width: 200px;
  max-height: 250px;

  @media (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    width: 150px;
    max-height: 150px;
  }
  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 150px;
    height: 150px;
  }
`;

const ExhibitionDetailContainer = styled.div`
  display: flex;
  height: fit-content;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const ExhibitionTextContainer = styled.div`
  color: ${({ theme }) => theme.color.font.main};
`;

const ExhibitionLinkTitle = styled.p`
  text-align: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.color.blue.main};
  font-weight: bold;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    display: block;
  }
`;

const ExhibitionLinkPlainText = styled.p`
  text-align: center;
  font-size: 3rem;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;

const ExhibitionLinkContainer = styled.div``;

const ExhibitionLinkButton = styled(Button)`
  margin-top: 30px;
  background-color: ${({ theme }) => theme.color.blue.dark};
  color: ${({ theme }) => theme.color.white};
  font-size: 2rem;
  font-weight: bold;
  width: fit-content;
  height: fit-content;
  border-color: transparent;

  &:hover {
    border-color: ${({ theme }) => theme.color.blue.dark};
    color: ${({ theme }) => theme.color.blue.dark};
  }

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 200px;
    font-size: 2rem;
  }
`;
export default ReviewExhibitionInfo;
