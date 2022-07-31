import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import * as S from './style'

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface SwiperProps{
    items: any[]
}

const SwiperContainer = ({items} : SwiperProps) => {
    return(
        <S.SwiperContainer>
            <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={4}
            autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            }}
            navigation
        >
        {items.map((it)=>(
            <SwiperSlide key={it.exhibitionId} className="MyBanner__slideItem">
                {it}
            </SwiperSlide>
            ))}
        </Swiper>
    </S.SwiperContainer>
    )
}
export default SwiperContainer;