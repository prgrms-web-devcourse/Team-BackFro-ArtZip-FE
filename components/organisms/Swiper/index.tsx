import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import * as S from './style';
import { useEffect, useState } from 'react';
import { ExhibitionProps } from 'types/model';
import { ExhibitionCard } from 'components/molecules';
import useWindowSize from 'hooks/useWindowSize';
import theme from 'styles/global/theme';

SwiperCore.use([Navigation, Autoplay]);

interface SwiperProps {
  items: Required<ExhibitionProps>[];
}

const checkIsMobile = (windowWidthSize: number) => {
  if (windowWidthSize < Number(theme.breakPoint.mobile.slice(0, 3))) {
    return true;
  }
  return false;
};

const SwiperWrapper = ({ items }: SwiperProps) => {
  const { windowWidthSize } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(checkIsMobile(windowWidthSize));
  }, [windowWidthSize]);

  return (
    <S.SwiperWrapper>
      <div className="parent">
        <Swiper
          className="swiper-container"
          spaceBetween={isMobile ? 200 : 20}
          slidesPerView={isMobile ? 1 : 3}
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
              <ExhibitionCard data={item} />
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
