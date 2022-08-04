import styled from '@emotion/styled';
import Logo from 'components/atoms/Logo';
import { Input } from 'antd';
import LinkText from 'components/atoms/LinkText';
import { useRouter } from 'next/router';

const Header = () => {
  const { pathname } = useRouter();

  return (
    <StyledHeader>
      <Container>
        <Logo width={252} height={92} />
        <Utility>
          <LinkText href="/signin" text="로그인" />
          <LinkText href="/signup" text="회원가입" />
        </Utility>
      </Container>
      <Container>
        <Navigation>
          <LinkText
            href="/search-result"
            text="맞춤 전시회"
            isCurrentPage={pathname === '/search-result'}
          />
          <LinkText
            href="/reviews/create"
            text="감상평 쓰기"
            isCurrentPage={pathname === '/reviews/create'}
          />
          <LinkText href="/community" text="커뮤니티" isCurrentPage={pathname === '/community'} />
        </Navigation>
        <SearchBar placeholder="전시회 제목을 검색해주세요." allowClear />
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
  border-bottom: 1px solid ${({ theme }) => theme.color.border.light};
  background-color: ${({ theme }) => theme.color.background};
  z-index: 999;
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
    margin-bottom: -3px;

    &:last-of-type {
      margin-right: 0;
    }

    &:hover {
      font-weight: 500;
      border-bottom: 4px solid ${({ theme }) => theme.color.blue.main};
    }

    @media (max-width: 767px) {
      margin-right: auto;
    }
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const SearchBar = styled(Input.Search)`
  // TODO: 스타일 초기화 - 재사용
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
  border: 2px solid ${({ theme }) => theme.color.blue.main};
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
