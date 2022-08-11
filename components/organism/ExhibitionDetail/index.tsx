import * as S from './style';
import { HeartOutlined, HeartFilled, ShareAltOutlined } from '@ant-design/icons';
import { ExhibitionInfo } from 'components/molecule';
import { LikeInfo } from 'components/molecule';
import { exhibitionAPI } from 'apis';
import { useEffect } from 'react';

interface ExhibitionDetailProps {
  exhibitionId: number;
  name: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  url: string;
  placeUrl: string;
  placeAddr: string;
  area: string;
  fee: string;
  inquiry: string;
  genre: string;
  isLiked: boolean;
  likeCount: number;
  onLikeClick?: () => void;
}

const ExhibitionDetail = ({
  exhibitionId,
  name,
  thumbnail,
  startDate,
  endDate,
  area,
  url,
  placeUrl,
  placeAddr,
  fee,
  inquiry,
  genre,
  isLiked,
  likeCount,
  onLikeClick,
}: ExhibitionDetailProps) => {
  return (
    <S.ExhibitionContainer>
      <S.Thumbnail src={thumbnail} preview={false}></S.Thumbnail>
      <S.Container>
        <S.InfoContainer>
          <S.Title>{name}</S.Title>
          <ExhibitionInfo
            isDate={true}
            startDate={startDate}
            endDate={endDate}
            title={'전시기간'}
          ></ExhibitionInfo>
          <ExhibitionInfo isLink={true} href={url} info={url} title={'홈페이지'}></ExhibitionInfo>
          <ExhibitionInfo title={'지역'} info={area}></ExhibitionInfo>
          <ExhibitionInfo
            title={'장소'}
            isLink={true}
            href={placeUrl}
            info={placeAddr}
          ></ExhibitionInfo>
          <ExhibitionInfo title={'입장료'} info={fee}></ExhibitionInfo>
          <ExhibitionInfo title={'문의처'} info={inquiry}></ExhibitionInfo>
          <ExhibitionInfo title={'장르'} info={genre}></ExhibitionInfo>
        </S.InfoContainer>
        <S.IconContainer>
          <LikeInfo isLiked={isLiked} likeCount={likeCount} onClick={onLikeClick} />
          {'    '}
          <ShareAltOutlined style={{ padding: 5 }} />
        </S.IconContainer>
      </S.Container>
    </S.ExhibitionContainer>
  );
};

export default ExhibitionDetail;
