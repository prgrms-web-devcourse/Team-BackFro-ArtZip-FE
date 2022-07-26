import styled from '@emotion/styled';
import { Button, Form, Input, Image } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useUserAuthActions } from 'hooks';
import { Logo } from 'components/atoms';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SignInPage = () => {
  const { localLogin } = useUserAuthActions();
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const redirectToOauthLogin = () => {
    if (!isLoading) {
      setIsLoading(true);
      route.push(`${process.env.NEXT_PUBLIC_API_END_POINT}api/v1/users/oauth/login/kakao`);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>ArtZip | 로그인</title>
      </Head>

      <FormContainer>
        <Link href={'/'}>
          <LogoWrapper>
            <Logo width={200} height={60}></Logo>
          </LogoWrapper>
        </Link>
        <Title>로그인</Title>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={localLogin}
        >
          <FormWrapper>
            <Form.Item name="email" rules={[{ required: true, message: '이메일을 입력해 주세요' }]}>
              <StyledInput bordered={false} placeholder="이메일을 입력해 주세요" />
            </Form.Item>
          </FormWrapper>
          <FormWrapper>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해 주세요' }]}
            >
              <StyledInput
                bordered={false}
                type="password"
                placeholder="비밀번호를 입력해 주세요"
              />
            </Form.Item>
          </FormWrapper>
          <Form.Item>
            <StyledButton type="text" htmlType="submit">
              로그인
            </StyledButton>
          </Form.Item>
          <Image
            alt="kakao"
            width={300}
            height={45}
            src="/kakao_login_medium_wide.png"
            preview={false}
            style={{ cursor: 'pointer' }}
            onClick={redirectToOauthLogin}
          />
        </Form>
        <Link href={`/signup`}>
          <StyledTextLink>회원이 아니신가요? 회원가입</StyledTextLink>
        </Link>
      </FormContainer>
    </>
  );
};

const LogoWrapper = styled.div`
  margin-bottom: 30px;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.font.main};
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  margin: 2% 25% 20% 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FormWrapper = styled.div`
  height: 75px;
`;
const StyledInput = styled(Input)`
  width: 300px;
  padding: 10px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.color.blue.light};
  font-size: 18px;
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.color.blue.light};
  }
  &:focus {
    box-shadow: none;
    border-bottom: 1px solid ${({ theme }) => theme.color.blue.dark};
  }
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.color.white};
  margin-top: 20px;
  width: 300px;
  height: 45px;
  font-size: 15px;
  background-color: ${({ theme }) => theme.color.blue.light};
  font-weight: 400;
  border: none;
  border-radius: 6px;
  &:hover {
    box-shadow: none;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.blue.dark};
  }
  &:focus {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.blue.light};
  }
`;

const StyledTextLink = styled.p`
  margin-top: 20px;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.color.font.light};
  &:hover {
    color: ${({ theme }) => theme.color.blue.light};
  }
`;

export default SignInPage;
