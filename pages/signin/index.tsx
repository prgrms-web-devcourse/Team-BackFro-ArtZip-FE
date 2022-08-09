import styled from '@emotion/styled';
import { Button, Checkbox, Form, Image, Input } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { UserLocalLoginRequest } from 'types/apis/user';
import { userAPI } from 'apis';
import { storage, cookie } from 'utils';
import Router from 'next/router';

const SignInPage = () => {
  const onFinish = async (values: UserLocalLoginRequest) => {
    try {
      const res = await userAPI.localLogin(values);
      const { accessToken, refreshToken } = res.data.data;
      console.log(accessToken, refreshToken);
      storage.setItem<string>('ACCESS_TOKEN', accessToken);
      cookie.setItem<string>('REFRESH_TOKEN', refreshToken);
      alert(res.data.message);
      Router.push('/');
      // eslint-disable-next-line
    } catch (e: any) {
      e.message = 'SigninError';
      alert(e.response.data.message);
      throw e;
    }
  };
  return (
    <>
      <Head>
        <title>ArtZip | SignIn</title>
      </Head>

      <FormWrapper>
        <Link href={'/'}>
          <Logo>Art.zip</Logo>
        </Link>
        <Title>로그인</Title>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item name="email" rules={[{ required: true, message: '!이메일을 입력해 주세요' }]}>
            <StyledInput placeholder="이메일을 입력해 주세요" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '!비밀번호를 입력해 주세요' }]}
          >
            <StyledInput type="password" placeholder="비밀번호를 입력해 주세요" />
          </Form.Item>

          <Form.Item>
            <StyledButton type="text" htmlType="submit">
              로그인
            </StyledButton>
          </Form.Item>
          <StyledButtonKakao>카카오 로그인</StyledButtonKakao>
        </Form>
        <Link href={`/signup`}>
          <StyledTextLink>회원이 아니신가요? 회원가입</StyledTextLink>
        </Link>
      </FormWrapper>
    </>
  );
};
const Logo = styled.div`
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.blue.main};
  margin-bottom: 30px;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.font.main};
  margin-bottom: 30px;
`;
const FormWrapper = styled.div`
  margin: 5% 25% 30% 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  height: 50px;
  font-size: 18px;
  background-color: ${({ theme }) => theme.color.blue.light};
  font-weight: 500;
  border: none;
  border-radius: 10px;
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

const StyledButtonKakao = styled.button`
  width: 300px;
  height: 50px;
  font-size: 18px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  background-color: #fee500;
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
