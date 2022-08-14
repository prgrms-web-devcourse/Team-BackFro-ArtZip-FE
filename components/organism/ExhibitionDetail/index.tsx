import * as S from './style';
import { ShareAltOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { ExhibitionInfo } from 'components/molecule';
import { LikeInfo } from 'components/molecule';
import { exhibitionAPI } from 'apis';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { exhibitionGenre, exhibitionPlace } from '../../../constants';

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
  genre: string | null;
  isLiked: boolean;
  likeCount: number;
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
}: ExhibitionDetailProps) => {
  const { userId } = useRecoilValue(userAtom);
  const [currentIsLiked, setCurrentIsLiked] = useState(isLiked);
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount);
  const [currentArea, setCurrentArea] = useState('');
  const [currentGenre, setCurrentGenre] = useState('');

  const setInfoName = () => {
    exhibitionPlace.forEach((areaObj) => {
      if (areaObj.value === area) {
        setCurrentArea(areaObj.name);
      }
    });
    exhibitionGenre.forEach((genreObj) => {
      if (genreObj.value === genre) {
        setCurrentGenre(genreObj.name);
      }
    });
  };

  useEffect(() => {
    console.log('ghcnf');
    setInfoName();
  }, []);

  const handleLikeClick = async () => {
    if (userId) {
      const { data } = await exhibitionAPI.likeToggle(exhibitionId);
      const { isLiked, likeCount } = data.data;
      setCurrentIsLiked(isLiked);
      setCurrentLikeCount(likeCount);
    } else {
      message.warning('로그인이 필요한 기능입니다');
      return;
    }
  };
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
          <ExhibitionInfo title={'지역'} info={currentArea}></ExhibitionInfo>
          <ExhibitionInfo
            title={'장소'}
            isLink={true}
            href={placeUrl}
            info={placeAddr}
            copy
          ></ExhibitionInfo>
          <ExhibitionInfo title={'입장료'} info={fee}></ExhibitionInfo>
          <ExhibitionInfo title={'문의처'} info={inquiry}></ExhibitionInfo>
          <ExhibitionInfo title={'장르'} info={currentGenre}></ExhibitionInfo>
        </S.InfoContainer>
        <S.IconContainer>
          <LikeInfo
            isLiked={currentIsLiked}
            likeCount={currentLikeCount}
            onClick={handleLikeClick}
          />
          {'    '}
          <ShareAltOutlined style={{ padding: 5 }} />
        </S.IconContainer>
      </S.Container>
    </S.ExhibitionContainer>
  );
};

export default ExhibitionDetail;
