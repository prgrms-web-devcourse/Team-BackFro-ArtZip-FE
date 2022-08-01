import styled from '@emotion/styled';

export const SwiperWrapper = styled.div`
  padding: 10px;
  position: relative;
  margin-bottom: 30px;

  .swiper-container {
    width: 80%;
    padding-left: 50px;
    padding-right: 50px;
  }

  .swiper-button-next {
    background-size: 50% auto;
    background-position: center;
    color: ${({ theme }) => theme.color.blue.main};
    position: absolute;
    right: -20px;
    z-index: 5;
  }

  .swiper-button-prev {
    color: ${({ theme }) => theme.color.blue.main};
  }
`;
