import styled from '@emotion/styled';

const Footer = () => {
  return (
    <StyledFooter>
      <h1>푸터</h1>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #808080;
`;

export default Footer;
