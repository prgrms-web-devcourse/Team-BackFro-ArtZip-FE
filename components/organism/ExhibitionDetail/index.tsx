import * as S from './style';
import { HeartOutlined, HeartFilled, ShareAltOutlined } from '@ant-design/icons';
import { ExhibitionInfo } from 'components/molecule';

interface ExhibitionDetailProps {
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
}

const ExhibitionDetail = ({
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
}: ExhibitionDetailProps) => {
  return (
    <S.ExhibitionContainer>
      <S.Thumbnail src={thumbnail} preview={false}></S.Thumbnail>
      <S.InfoContainer>
        <S.Title>{name}</S.Title>
        <S.Line></S.Line>
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
        {isLiked ? <HeartFilled /> : <HeartOutlined />}
        {'    '}
        <ShareAltOutlined />
      </S.IconContainer>
    </S.ExhibitionContainer>
  );
};

export default ExhibitionDetail;
