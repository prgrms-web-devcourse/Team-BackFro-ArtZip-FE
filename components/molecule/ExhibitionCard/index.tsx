import React, { useEffect, useState } from 'react';
import { Card, Image } from 'antd';
import { HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import * as S from './style';
import Link from 'next/link';
import { ExhibitionProps } from 'types/model';
import { displayDday, displayFormattedDate } from 'utils';

const { Meta } = Card;

const ExhibitionCard = ({
  exhibitionId,
  name,
  thumbnail,
  startDate,
  endDate,
  likeCount,
  reviewCount,
  isLiked,
}: Required<ExhibitionProps>) => {
  const [isHover, setIsHover] = useState(false);
  const dDay = displayDday(startDate);
  const mouseHover = () => setIsHover((isHover) => !isHover);

  return (
    <Link href={`exhibitions/detail/${exhibitionId}`}>
      <S.ExhibitionCard>
        <Card
          className="exhibition-card"
          onMouseEnter={mouseHover}
          onMouseLeave={mouseHover}
          cover={<Image alt="card image" src={thumbnail} className="card-image" preview={false} />}
        >
          {isHover && (
            <S.HoverContent>
              {' '}
              {isLiked ? <HeartFilled className="heart-icon" /> : <HeartOutlined />}
              {likeCount} <MessageOutlined /> {reviewCount}{' '}
            </S.HoverContent>
          )}
        </Card>
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
  );
};

export default ExhibitionCard;
