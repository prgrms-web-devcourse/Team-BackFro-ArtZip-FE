import styled from '@emotion/styled';
import { CopyOutlined } from '@ant-design/icons';

interface ExhibitionInfoProps {
  title: string;
  info?: string | null;
  href?: string;
  isLink?: boolean;
  isDate?: boolean;
  startDate?: string;
  endDate?: string;
  copy?: boolean;
}

const ExhibitionInfo = ({
  title,
  info,
  href,
  isLink,
  isDate,
  startDate,
  endDate,
  copy,
}: ExhibitionInfoProps) => {
  const onClick = () => {
    navigator.clipboard.writeText(info ? info : '');
  };
  return (
    <InfoTextContainer>
      <InfoTextBold>{title}</InfoTextBold>
      {isLink ? (
        <CopyWrapper>
          <StyledLink href={`${href}`}>
            <InfoText> {info}</InfoText>
          </StyledLink>
          {copy && (
            <StyledButton>
              <Clipboard onClick={onClick} />
            </StyledButton>
          )}
        </CopyWrapper>
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

const StyledLink = styled.a`
  &:hover {
    color: ${({ theme }) => theme.color.blue.dark};
  }
`;

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
    min-width: 60px;
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

const StyledButton = styled.button`
  margin-left: 10px;
  position: relative;
  top: 2px;
  right: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.blue.dark};
  }
`;

const Clipboard = styled(CopyOutlined)`
  font-size: 1.9rem;
`;

const CopyWrapper = styled.div`
  display: flex;
  align-items: center;
`;
