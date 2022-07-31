import styled from "@emotion/styled"

export const SwiperContainer = styled.div`
    padding: 10px;
    box-sizing: border-box;

  .swiper-button-next {
    background-size: 50% auto;
    background-position: center;
    color: ${({ theme }) => theme.color.blue.main};
  }

  .swiper-button-prev {
    color: ${({ theme }) => theme.color.blue.main};
  }

  // .swiper-button-next::after,
  // .swiper-button-prev::after {
  //   display: none;
  // }

`