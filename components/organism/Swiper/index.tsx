import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";
import * as S from './style'

SwiperCore.use([Navigation, Autoplay]);

interface SwiperProps{
    items: any[]
}

const SwiperContainer = ({items} : SwiperProps) => {
    return(
        <S.SwiperContainer>
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
                    {items.map((it)=>(
                        <SwiperSlide key={it.exhibitionId} className="MyBanner__slideItem">
                            {it}
                        </SwiperSlide>
                        ))}
                    </Swiper>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
        </div>
    </S.SwiperContainer>
    )
}
export default SwiperContainer;