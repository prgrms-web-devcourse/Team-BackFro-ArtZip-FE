import styled from '@emotion/styled';
import { Button, Checkbox, Form, Image, Input } from 'antd';
import Head from 'next/head';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>ArtZip | SignUp</title>
      </Head>

      <FormWrapper>
        <Link href={'/'}>
          <Logo>Art.zip</Logo>
        </Link>
        <Title>회원가입</Title>
        <Form name="basic" initialValues={{ remember: true }} autoComplete="off">
          <Form.Item
            name="username"
            rules={[{ required: true, message: '!이메일을 입력해 주세요' }]}
          >
            <StyledInput placeholder="이메일을 입력해 주세요" />
          </Form.Item>

          <Form.Item
            name="nickname"
            rules={[{ required: true, message: '!비밀번호를 입력해 주세요' }]}
          >
            <StyledInput type="basic" placeholder="닉네임을 입력해 주세요" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '!비밀번호를 입력해 주세요' }]}
          >
            <StyledInput type="password" placeholder="비밀번호를 입력해 주세요" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '!비밀번호를 입력해 주세요' }]}
          >
            <StyledInput type="password" placeholder="비밀번호를 한 번 더 입력해 주세요" />
          </Form.Item>

          <Form.Item>
            <StyledButton type="text" htmlType="submit">
              회원가입
            </StyledButton>
          </Form.Item>
        </Form>
        <Link href={`/signin`}>
          <StyledTextLink>이미 계정이 있으신가요? 로그인</StyledTextLink>
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
  width: 350px;
  padding: 10px;
  background-color: transparent;
  border: none;
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
  width: 350px;
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

export default SignUpPage;
