import styled from '@emotion/styled';
import { Button, Form, Input, message } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { userAPI } from 'apis';
import Router from 'next/router';
import React, { useState } from 'react';
import { useUserAuthActions } from 'hooks';
import { useCallback } from 'react';
import Logo from 'components/atoms/Logo';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isUnique, setIsUnique] = useState(false);
  const { localLogin } = useUserAuthActions();
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line
  const validatePassword = useCallback((_: any, value: string) => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!?@#$%^&*])[a-zA-Z0-9!?@#$%^&*]{8,13}$/;
    if (!value) {
      return Promise.reject(new Error('비밀번호를 입력해 주세요.'));
    }
    if (!regExp.test(value)) {
      return Promise.reject(new Error('8~13자 영문, 숫자, 특수문자를 사용하세요.'));
    }
    return Promise.resolve();
  }, []);

  // eslint-disable-next-line
  const validateNickname = useCallback((_: any, value: string) => {
    const regExp = /\s/g;
    if (!value) {
      return Promise.reject(new Error('닉네임을 입력해 주세요.'));
    }
    if (regExp.test(value)) {
      return Promise.reject(new Error('공백 문자를 제외하고 입력해 주세요.'));
    }
    if (value.length > 10) {
      return Promise.reject(new Error('최대 10자까지 입력 가능합니다.'));
    }
    return Promise.resolve();
  }, []);

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
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    const values = { email: email, nickname: nickname, password: password };
    const valuesSignin = { email: email, password: password };
    try {
      if (isUnique) {
        const resSignup = await userAPI.signUp(values);
        message.success(resSignup.data.message);
        localLogin(valuesSignin);
        Router.push('/');
      } else {
        message.error('닉네임 중복 확인을 진행해 주세요.');
      }

      // eslint-disable-next-line
    } catch (e: any) {
      e.message = 'SignupError';
      console.log(e);
      message.error(e.response.data.message);
      throw e;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const onClick = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    if (nickname) {
      if (nickname.length > 10) {
        message.error('닉네임을 10자 이내로 입력해 주세요.');
      } else {
        const res = await userAPI.checkNickname(nickname);
        setIsUnique(res.data.data.isUnique);

        message.info(
          res.data.data.isUnique ? '사용 가능한 닉네임 입니다.' : '이미 존재하는 닉네임 입니다.',
        );
      }
    } else {
      message.error('닉네임을 입력해 주세요.');
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>ArtZip | SignUp</title>
      </Head>

      <FormWrapper>
        <Link href={'/'}>
          <LogoWrapper>
            <Logo width={200} height={60}></Logo>
          </LogoWrapper>
        </Link>
        <Title>회원가입</Title>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <FormItemContainer>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '이메일 형식이 아닙니다.',
                },
                { required: true, message: '이메일을 입력해 주세요.' },
              ]}
            >
              <StyledInput
                placeholder="이메일을 입력해 주세요."
                onChange={onChangeEmail}
                bordered={false}
              />
            </Form.Item>
          </FormItemContainer>
          <NicknameContainer>
            <Form.Item name="nickname" rules={[{ validator: validateNickname }]}>
              <StyledInputNickname
                type="basic"
                placeholder="닉네임을 입력해 주세요."
                onChange={onChangeNickname}
                bordered={false}
              />
            </Form.Item>
            <StyledCheckButton type="button" onClick={onClick}>
              {isUnique ? '✔' : '중복 확인'}
            </StyledCheckButton>
          </NicknameContainer>
          <FormItemContainer>
            <Form.Item name="password" rules={[{ validator: validatePassword }]}>
              <StyledInput
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                onChange={onChangePassword}
                bordered={false}
              />
            </Form.Item>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item
              name="confirm"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력해 주세요.',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('비밀번호와 일치하지 않습니다.'));
                  },
                }),
              ]}
            >
              <StyledInput
                type="password"
                placeholder="비밀번호를 한 번 더 입력해 주세요."
                bordered={false}
              />
            </Form.Item>
          </FormItemContainer>
          <FormItemContainer>
            <Form.Item>
              <StyledButton type="text" htmlType="submit">
                회원가입
              </StyledButton>
            </Form.Item>
          </FormItemContainer>
        </Form>
        <Link href={`/signin`}>
          <StyledTextLink>이미 계정이 있으신가요? 로그인</StyledTextLink>
        </Link>
      </FormWrapper>
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

const FormItemContainer = styled.div`
  height: 75px;
`;

const FormWrapper = styled.div`
  margin: 2% 25% 5% 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 350px;
  padding: 10px;
  margin-bottom: 5px;
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
  margin-bottom: 150px;
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

const NicknameContainer = styled(FormItemContainer)`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StyledInputNickname = styled(StyledInput)`
  width: 220px;
`;

export default SignUpPage;
