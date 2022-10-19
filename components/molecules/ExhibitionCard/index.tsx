import { useState } from 'react';
import { Card } from 'antd';
import { HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import * as S from './style';
import Link from 'next/link';
import { ExhibitionProps } from 'types/model';
import { displayDday, displayFormattedDate } from 'utils';
import Image from 'next/image';
import DEFAULT_IMAGE from 'constants/defaultImage';

interface ExhibitionCardProps {
  data: Required<ExhibitionProps>;
}

const ExhibitionCard = ({ data }: ExhibitionCardProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { exhibitionId, name, thumbnail, startDate, endDate, likeCount, reviewCount, isLiked } =
    data;

  const dDay = displayDday(startDate);
  const mouseHover = () => setIsHover((isHover) => !isHover);

  return (
    <S.ExhibitionCardWrapper onMouseEnter={mouseHover} onMouseLeave={mouseHover}>
      {isHover && (
        <S.HoverContent>
          {isLiked ? <HeartFilled className="heart-icon" /> : <HeartOutlined />}
          {likeCount} <MessageOutlined /> {reviewCount}
        </S.HoverContent>
      )}
      <Link href={`/exhibitions/detail/${exhibitionId}`}>
        <S.ExhibitionCard isHover={isHover}>
          <Card
            className="exhibition-card"
            cover={
              <Image
                src={thumbnail}
                alt="card image"
                layout="responsive"
                sizes="(max-width: 767px) 200px, 250px"
                width={250}
                height={300}
                placeholder="blur"
                blurDataURL={DEFAULT_IMAGE.BLUR_DATA_URL}
                className="card-image"
              />
            }
          ></Card>
          <S.Description>
            <h3 className="title">{name}</h3>
            <div>
              <h3>
                {displayFormattedDate(startDate)} - {displayFormattedDate(endDate)}
              </h3>
              <S.Dday>
                D{dDay < 0 ? '+' : '-'}
                {Math.abs(dDay)}
              </S.Dday>
            </div>
          </S.Description>
        </S.ExhibitionCard>
      </Link>
    </S.ExhibitionCardWrapper>
  );
};

export default ExhibitionCard;
