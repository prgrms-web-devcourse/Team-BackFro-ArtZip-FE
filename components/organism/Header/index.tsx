import styled from '@emotion/styled';
import Logo from 'components/atoms/Logo';
import { Input } from 'antd';
import Link from 'next/link';

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <Utility>
          <Link href="/signin" passHref>
            <StyledA>로그인</StyledA>
          </Link>
          <Link href="/signup" passHref>
            <StyledA>회원가입</StyledA>
          </Link>
        </Utility>
      </Container>
      <Container>
        <Navigation>
          <Link href="/search-result" passHref>
            <StyledA>맞춤 전시회</StyledA>
          </Link>
          <Link href="/reviews/create" passHref>
            <StyledA>감상평 쓰기</StyledA>
          </Link>
          <Link href="/community" passHref>
            <StyledA>커뮤니티</StyledA>
          </Link>
        </Navigation>
        <SearchBar placeholder="전시회를 검색해주세요." allowClear />
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 10px;
  border-bottom: 1px solid #dddddd;
  background-color: #fafafa;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 1400px;
  margin: 0 auto;

  &:first-of-type {
    margin-bottom: 10px;
  }

  @media (max-width: 767px) {
    width: 90%;
  }
`;

const Utility = styled.div`
  & > a:first-of-type {
    margin-right: 20px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > a {
    margin-right: 80px;
    padding-bottom: 20px;
    border-bottom: 4px solid transparent;
    margin-bottom: -3px;

    &:last-of-type {
      margin-right: 0;
    }

    &:hover {
      font-weight: 500;
      border-bottom: 4px solid #242f9b;
    }

    @media (max-width: 767px) {
      margin-right: auto;
    }
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const StyledA = styled.a`
  font-size: 2.6rem;
`;

const SearchBar = styled(Input.Search)`
  * {
    border: 0;
    outline: none;
    background: none;

    &:hover,
    &:active,
    &:focus,
    &:focus-within {
      border: 0;
      outline: none;
      box-shadow: none;
      background: none;
      --antd-wave-shadow-color: none;
    }
  }

  width: 400px;
  margin-bottom: 20px;
  border: 2px solid #242f9b;
  border-radius: 18px;
  overflow: hidden;

  .ant-input-affix-wrapper {
    padding: 8px 16px;
  }

  .ant-input {
    font-size: 1.8rem;
  }

  .ant-input-clear-icon {
    font-size: 1.8rem;
  }

  .ant-input-search-button {
    margin-right: 10px;
  }

  .anticon-search {
    font-size: 2.4rem;
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

export default Header;
