import styled from '@emotion/styled';

const Header = () => {
  return (
    <StyledHeader>
      <h1>헤더</h1>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  height: 200px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #80808026;
`;

export default Header;
