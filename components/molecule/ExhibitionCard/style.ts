import styled from "@emotion/styled"

export const ExhibitionCard = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 270px;
    height: 400px;
`

export const HoverContent = styled.div`
    z-index: 5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    gap: 10px;
    color: white;
    top:50%;
    left:40%;
`

export const Description = styled.div`
    padding: 10px;
    div{
        display: flex;
        align-items: center;
        gap: 10px;

        h3{
            //TODO: theme gray 로 변경
            color: gray;
        }
    }

`

export const Title = styled.div`

`
export const Dday = styled.span`
    display:flex;
    align-items:center;
    justify-content: center;
    background-color: #7C4789;
    color: white;
    font-size: 15px;
    border-radius: 15px;
    width: 50px;
    height: 30px;
`