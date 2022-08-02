import React, { ReactElement } from 'react';
import * as S from './style';
import Link from 'next/link';

export type ExhibitionType = 'upcoming' | 'popular';

interface SwiperContainerProps {
  title: string;
  children: ReactElement;
  type: ExhibitionType;
}

const SwiperContainer = ({ title, children, type }: SwiperContainerProps) => {
  return (
    <S.SwiperContainer>
      <div className="swiper-container-head">
        <h3>{title}</h3>
        <Link
          href={{
            pathname: '/search-result',
            query: { type },
          }}
        >
          <p>더보기</p>
        </Link>
      </div>
      <div>{children}</div>
    </S.SwiperContainer>
  );
};
export default SwiperContainer;
