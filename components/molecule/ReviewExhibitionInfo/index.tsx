import Link from 'next/link';
import styled from '@emotion/styled';
import { Button, Image, Card } from 'antd';
import { ExhibitionProps } from 'types/model';
import { LinkOutlined } from '@ant-design/icons';

const ReviewExhibitionInfo = ({ exhibition }: { exhibition: ExhibitionProps }) => {
  const { exhibitionId, name, thumbnail } = exhibition;

  return (
    <Card>
      <ExhibitionInfoContainer>
        <ExhibitionInfoImage
          width={200}
          height={250}
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
    </Card>
  );
};

const ExhibitionInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
`;

const ExhibitionInfoImage = styled(Image)`
  object-fit: cover;
`;

const ExhibitionDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const ExhibitionTextContainer = styled.div`
  color: ${({ theme }) => theme.color.font.main};
`;

const ExhibitionLinkTitle = styled.span`
  text-align: center;
  font-size: 4rem;
  color: ${({ theme }) => theme.color.blue.main};
  font-weight: bold;

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    display: block;
  }
`;

const ExhibitionLinkPlainText = styled.span`
  text-align: center;
  font-size: 4rem;

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
  font-size: 4rem;
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
