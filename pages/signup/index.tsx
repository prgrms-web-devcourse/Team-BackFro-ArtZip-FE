import styled from '@emotion/styled';
import { Button, Form, Input } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { userAPI } from 'apis';
import Router from 'next/router';
import React, { useState } from 'react';
import { storage, cookie } from 'utils';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isUnique, setIsUnique] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUnique(false);
    setNickname(e.target.value);
  };

  const onFinish = async () => {
    const values = { email: email, nickname: nickname, password: password };
    const valuesSignin = { email: email, password: password };
    try {
      if (isUnique) {
        const resSignup = await userAPI.signUp(values);
        alert(resSignup.data.message);
        const resSignin = await userAPI.localLogin(valuesSignin);
        const { accessToken, refreshToken } = resSignin.data.data;
        storage.setItem<string>('ACCESS_TOKEN', accessToken);
        cookie.setItem<string>('REFRESH_TOKEN', refreshToken);
        Router.push('/');
      } else {
        alert('닉네임 중복 확인을 진행해 주세요');
      }

      // eslint-disable-next-line
    } catch (e: any) {
      e.message = 'SignupError';
      console.log(e);
      alert(e.response.data.message);
      throw e;
    }
  };

  const onClick = async () => {
    const res = await userAPI.nicknameCheck(nickname);
    setIsUnique(res.data.data.isUnique);
    alert(res.data.data.isUnique ? '사용 가능한 닉네임 입니다' : '이미 존재하는 닉네임 입니다');
  };

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
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: '이메일 형식이 아닙니다',
              },
              { required: true, message: '이메일을 입력해 주세요' },
            ]}
          >
            <StyledInput
              placeholder="이메일을 입력해 주세요"
              onChange={onChangeEmail}
              bordered={false}
            />
          </Form.Item>
          <NicknameContainer>
            <Form.Item
              name="nickname"
              rules={[{ required: true, message: '닉네임을 입력해 주세요' }]}
            >
              <StyledInputNickname
                type="basic"
                placeholder="닉네임을 입력해 주세요"
                onChange={onChangeNickname}
                bordered={false}
              />
            </Form.Item>
            <StyledCheckButton type="button" onClick={onClick}>
              {isUnique ? '✔' : '중복 확인'}
            </StyledCheckButton>
          </NicknameContainer>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '비밀번호를 입력해 주세요' }]}
          >
            <StyledInput
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              onChange={onChangePassword}
              bordered={false}
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해 주세요',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('비밀번호와 일치하지 않습니다'));
                },
              }),
            ]}
          >
            <StyledInput
              type="password"
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              bordered={false}
            />
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

const StyledCheckButton = styled.button`
  font-size: 18px;
  width: 100px;
  height: 52px;
  color: ${({ theme }) => theme.color.white};
  border: none;
  background-color: ${({ theme }) => theme.color.blue.light};
  border: 1px solid ${({ theme }) => theme.color.blue.light};
  border-radius: 15px;
  &:hover {
    border: none;
    background-color: ${({ theme }) => theme.color.blue.dark};
  }
`;

const NicknameContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledInputNickname = styled(StyledInput)`
  width: 220px;
`;

export default SignUpPage;
