import styled from '@emotion/styled';

interface ExhibitionInfoProps {
  title: string;
  info?: string;
  href?: string;
  isLink?: boolean;
  isDate?: boolean;
  startDate?: string;
  endDate?: string;
}

const ExhibitionInfo = ({
  title,
  info,
  href,
  isLink,
  isDate,
  startDate,
  endDate,
}: ExhibitionInfoProps) => {
  return (
    <InfoTextContainer>
      <InfoTextBold>{title}</InfoTextBold>
      {isLink ? (
        <a href={`${href}`}>
          <InfoText> {info}</InfoText>
        </a>
      ) : isDate ? (
        <InfoText>
          {startDate} ~ {endDate}
        </InfoText>
      ) : (
        <InfoText> {info}</InfoText>
      )}
    </InfoTextContainer>
  );
};

export default ExhibitionInfo;

const InfoTextContainer = styled.div`
  display: flex;
  margin-bottom: 17px;
`;

const InfoTextBold = styled.p`
  min-width: 90px;
  font-size: 1.9rem;
  height: 100%;
  font-weight: 700;
  color: ${({ theme }) => theme.color.font.main};
  border-right: solid 1px ${({ theme }) => theme.color.font.light};
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    min-width: 55px;
  }
`;
const InfoText = styled.p`
  padding-left: 15px;
  font-size: 1.8rem;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
