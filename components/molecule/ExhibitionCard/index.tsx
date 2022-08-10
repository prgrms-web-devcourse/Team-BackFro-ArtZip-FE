import React, { useState } from 'react';
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
  const mouseHover = () => setIsHover((isHover) => !isHover);

  return (
    <Link href={`exhibitions/detail/${exhibitionId}`}>
      <S.ExhibitionCard>
        <Card
          hoverable
          extra={
            isHover ? (
              <S.HoverContent>
                {' '}
                {isLiked ? <HeartFilled className="heart-icon" /> : <HeartOutlined />}
                {likeCount} <MessageOutlined /> {reviewCount}{' '}
              </S.HoverContent>
            ) : null
          }
          onMouseEnter={mouseHover}
          onMouseLeave={mouseHover}
          style={{
            width: '100%',
            height: '85%',
            position: 'relative',
          }}
          cover={<Image alt="card image" src={thumbnail} className="card-image" />}
        />
        <S.Description>
          <h3>{name}</h3>
          <div>
            <h3>
              {displayFormattedDate(startDate)} - {displayFormattedDate(endDate)}
            </h3>
            <S.Dday>D-{displayDday(startDate)}</S.Dday>
          </div>
        </S.Description>
      </S.ExhibitionCard>
    </Link>
  );
};

export default ExhibitionCard;
