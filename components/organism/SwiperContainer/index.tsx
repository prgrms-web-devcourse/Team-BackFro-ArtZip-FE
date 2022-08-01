import React,{ReactElement} from "react";
import * as S from './style'

interface SwiperContainerProps{
    title: string;
    children: ReactElement;
}

const SwiperContainer = ({title, children}: SwiperContainerProps) => {
    return(
        <S.SwiperContainer>
            <div className="swiper-container-head">
                <h3>{title}</h3>
                <p>더보기</p>
            </div>
            <div>
                {children}
            </div>
        </S.SwiperContainer>
    )
}
export default SwiperContainer;