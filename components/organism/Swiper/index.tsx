import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import * as S from './style';
import React,{ReactElement} from 'react';

SwiperCore.use([Navigation, Autoplay]);

interface SwiperProps{
    items: ReactElement[]
    // items: SVGRectElement[]
}

const SwiperWrapper = ({items} : SwiperProps) => {
    return(
        <S.SwiperWrapper>
            <div className="parent">
                    <Swiper className="swiper-container"
                        modules={[Autoplay]}
                        spaceBetween={20}
                        slidesPerView={3}
                        autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',
                        }}>
                    {items.map((item)=>(
                        <SwiperSlide key={item.exhibitionId} className="MyBanner__slideItem">
                            {item}
                        </SwiperSlide>
                        ))}
                    </Swiper>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
    </S.SwiperWrapper>
    )
}
export default SwiperWrapper;