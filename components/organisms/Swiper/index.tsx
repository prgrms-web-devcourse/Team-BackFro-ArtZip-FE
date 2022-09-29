import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import * as S from './style';
import React, { ReactElement } from 'react';
import { ExhibitionProps } from 'types/model';
import { ExhibitionCard } from 'components/molecules';

SwiperCore.use([Navigation, Autoplay]);

interface SwiperProps {
  items: ExhibitionProps[];
  type: 'upcoming' | 'popular';
}

const SwiperWrapper = ({ items, type }: SwiperProps) => {
  return (
    <S.SwiperWrapper type={type}>
      <div className="parent">
        <Swiper
          className="swiper-container"
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: `.swiper-button-prev.${type}`,
            nextEl: `.swiper-button-next.${type}`,
          }}
        >
          {items.map((item) => (
            <SwiperSlide key={item.exhibitionId} className="MyBanner__slideItem">
              <ExhibitionCard
                exhibitionId={item.exhibitionId}
                name={item.name}
                thumbnail={item.thumbnail}
                startDate={item.startDate!}
                endDate={item.endDate!}
                likeCount={item.likeCount!}
                reviewCount={item.reviewCount!}
                isLiked={item.isLiked!}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={`swiper-button-prev ${type}`}></div>
        <div className={`swiper-button-next ${type}`}></div>
      </div>
    </S.SwiperWrapper>
  );
};

export default SwiperWrapper;
