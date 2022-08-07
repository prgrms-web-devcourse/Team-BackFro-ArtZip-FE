import Link from 'next/link';
import styled from '@emotion/styled';
import { Form, Input, Button } from 'antd';

const UserEditPasswordPage = () => {
  return (
    <PageContainer>
      <Title>비밀번호 변경</Title>
      <PasswordEditForm layout="vertical">
        <FormItem label="현재 비밀번호">
          <Input type="password" />
        </FormItem>
        <FormItem label="비밀번호">
          <Input type="password" />
        </FormItem>
        <FormItem label="비밀번호 확인">
          <Input type="password" />
        </FormItem>
        <SubmitButton type="primary">변경</SubmitButton>
      </PasswordEditForm>

      <NavigationButtons>
        <Link href="/users/1">
          <a>
            <NavigationButton type="default" size="large">
              사용자 정보
            </NavigationButton>
          </a>
        </Link>
        <Link href="/users/1/edit">
          <a>
            <NavigationButton type="default" size="large">
              프로필 수정
            </NavigationButton>
          </a>
        </Link>
        <Link href="/users/1/edit-password">
          <a>
            <NavigationButton type="primary" size="large">
              비밀번호 변경
            </NavigationButton>
          </a>
        </Link>
      </NavigationButtons>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding-left: 200px;
`;

const NavigationButtons = styled.nav`
  position: absolute;
  top: 20px;
  left: -50px;
`;

const NavigationButton = styled(Button)`
  display: block;
  width: 130px;
  margin-bottom: 2px;
`;

const PasswordEditForm = styled(Form)`
  border: 1px solid ${({ theme }) => theme.color.border.main};
  border-radius: 8px;
  padding: 28px;
`;

const FormItem = styled(Form.Item)`
  label {
    font-size: 2rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const SubmitButton = styled(Button)`
  font-size: 1.6rem;
`;

export default UserEditPasswordPage;
