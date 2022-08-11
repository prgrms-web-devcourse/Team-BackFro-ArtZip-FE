import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import * as S from './style';
import React, { ReactElement } from 'react';
import { ExhibitionProps } from 'types/model';
import { ExhibitionCard } from 'components/molecule';

SwiperCore.use([Navigation, Autoplay]);

interface SwiperProps {
  items: ExhibitionProps[];
}

const SwiperWrapper = ({ items }: SwiperProps) => {
  return (
    <S.SwiperWrapper>
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
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
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
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </S.SwiperWrapper>
  );
};

export default SwiperWrapper;
