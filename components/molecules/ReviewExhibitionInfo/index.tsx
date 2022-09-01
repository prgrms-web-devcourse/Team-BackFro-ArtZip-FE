import Link from 'next/link';
import styled from '@emotion/styled';
import { Button, Image, Card } from 'antd';
import { ExhibitionProps } from 'types/model';
import { LinkOutlined } from '@ant-design/icons';
import * as S from './style';

const ReviewExhibitionInfo = ({ exhibition }: { exhibition: ExhibitionProps }) => {
  const { exhibitionId, name, thumbnail } = exhibition;

  return (
    <S.ExhibitionInfoCard>
      <S.ExhibitionInfoContainer>
        <S.ExhibitionInfoImage
          src={thumbnail}
          width={150}
          height={180}
          alt={`exhibition(${name}) info Image`}
        />

        <S.ExhibitionDetailContainer>
          <S.ExhibitionTextContainer>
            <S.ExhibitionLinkTitle>{name}</S.ExhibitionLinkTitle>
            <S.ExhibitionLinkPlainText> 정보가 궁금하다면? </S.ExhibitionLinkPlainText>
          </S.ExhibitionTextContainer>
          <S.ExhibitionLinkContainer>
            <Link href={`/exhibitions/detail/${exhibitionId}`}>
              <S.ExhibitionLinkButton type="ghost">
                <LinkOutlined />더 알아보기
              </S.ExhibitionLinkButton>
            </Link>
          </S.ExhibitionLinkContainer>
        </S.ExhibitionDetailContainer>
      </S.ExhibitionInfoContainer>
    </S.ExhibitionInfoCard>
  );
};

export default ReviewExhibitionInfo;
