import styled from "@emotion/styled"

export const SwiperContainer = styled.div`
    margin:30px 0;
    .swiper-container-head{
        display: flex;
        justify-content: space-between;

        p{
            cursor: pointer;
            color:${({ theme }) => theme.color.font.light}
        }
    }
`