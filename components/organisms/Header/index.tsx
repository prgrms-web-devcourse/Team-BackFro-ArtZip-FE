import styled from '@emotion/styled';
import Logo from 'components/atoms/Logo';
import { Input, message, Image } from 'antd';
import LinkText from 'components/atoms/LinkText';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { useClickAway, useUserAuthActions } from 'hooks';
import imageUrl from 'constants/imageUrl';
import { useRef, useState } from 'react';

const Header = () => {
  const router = useRouter();
  const { userId, profileImage, isLoggedIn } = useRecoilValue(userAtom);
  console.log(isLoggedIn);

  const { logout } = useUserAuthActions();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const avatarContainer = useRef<HTMLDivElement>(null);

  useClickAway(avatarContainer, () => {
    setIsDropdownOpen(false);
  });

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchExhibition = (value: string) => {
    const isEmpty = !/\S/.test(value);
    if (isEmpty || value.length < 2) {
      message.warning('두 글자 이상 입력해주세요.');
      return;
    }
    router.push({
      pathname: `/search-result/${value}`,
    });
  };

  return (
    <StyledHeader>
      <Container>
        <Logo width={180} height={55} />
        {isLoggedIn ? (
          <AvatarContainer ref={avatarContainer} onClick={handleAvatarClick}>
            <Avatar src={profileImage || imageUrl.USER_DEFAULT} preview={false} />
            {isDropdownOpen && (
              <Dropdown>
                <LinkText href={`/users/${userId}`} text="마이페이지" />
                <Button onClick={logout}>로그아웃</Button>
              </Dropdown>
            )}
          </AvatarContainer>
        ) : (
          <Utility>
            <LinkText href="/signin" text="로그인" />
            <LinkText href="/signup" text="회원가입" />
          </Utility>
        )}
      </Container>
      <Container>
        <Navigation>
          <LinkText
            href="/exhibitions/custom"
            text="맞춤 전시회"
            isCurrentPage={router.pathname === '/exhibitions/custom'}
          />
          <LinkText
            href="/reviews/create"
            text="후기 작성"
            isCurrentPage={router.pathname === '/reviews/create'}
          />
          <LinkText
            href="/community"
            text="커뮤니티"
            isCurrentPage={router.pathname === '/community'}
          />
        </Navigation>
        <SearchBar
          bordered={false}
          placeholder="전시회 제목을 검색해주세요."
          allowClear
          onSearch={handleSearchExhibition}
          size="large"
          enterButton={true}
        />
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
    margin-top: 20px;
    margin-bottom: 10px;
  }

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 90%;
  }
`;

const Utility = styled.div`
  display: flex;
  align-items: center;
  & > a:first-of-type {
    margin-right: 20px;

    @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
      margin-right: 10px;
    }
  }

  & > a:last-of-type {
    @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
      display: none;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > a {
    margin-right: 80px;
    padding-bottom: 14px;
    margin-bottom: -3px;
    border-bottom: 3px solid transparent;
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      font-weight: 500;
      border-bottom: 3px solid ${({ theme }) => theme.color.blue.main};
    }

    @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
      margin-right: auto;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    width: 100%;
  }
`;

const SearchBar = styled(Input.Search)`
  width: 400px;
  margin-bottom: 14px;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.blue.light};
  input::placeholder {
    color: ${({ theme }) => theme.color.blue.light};
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.color.blue.dark};
  }
  .ant-btn {
    background-color: transparent;
    color: ${({ theme }) => theme.color.blue.dark};
    height: 35px;
    border: none;
    box-shadow: none;
  }

  @media (max-width: ${({ theme }) => theme.breakPoint.mobile}) {
    display: none;
  }
`;

const Button = styled.button`
  width: 100%;
  font-size: 2.2rem;
  white-space: nowrap;
  &:hover {
    color: ${({ theme }) => theme.color.blue.dark};
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const Avatar = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  width: 140px;
  top: 50px;
  right: 0;
  z-index: 1;
  box-shadow: rgb(63 71 77 / 20%) 0px 4px 10px 0px;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
`;

export default Header;
