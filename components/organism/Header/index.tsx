import styled from '@emotion/styled';
import Logo from 'components/atoms/Logo';
import { Input } from 'antd';
import Link from 'next/link';

const { Search } = Input;

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Logo />
        <Search
          placeholder="전시회를 검색해주세요."
          allowClear
          style={{
            width: 200,
          }}
        />
      </Container>
      <Navigation>
        <PageLinks>
          <Link href="/search-result" passHref>
            <StyledA>맞춤 전시회</StyledA>
          </Link>
          <Link href="/reviews/create" passHref>
            <StyledA>감상평 쓰기</StyledA>
          </Link>
          <Link href="/community" passHref>
            <StyledA>커뮤니티</StyledA>
          </Link>
        </PageLinks>
        <UserLinks>
          <Link href="/signin" passHref>
            <StyledA>로그인</StyledA>
          </Link>
          <Link href="/signup" passHref>
            <StyledA>회원가입</StyledA>
          </Link>
        </UserLinks>
      </Navigation>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  height: 200px;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #dddddd;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageLinks = styled.div`
  display: flex;
`;

const UserLinks = styled.div`
  display: flex;
`;

const StyledA = styled.a`
  font-size: 2.6rem;
`;

export default Header;
