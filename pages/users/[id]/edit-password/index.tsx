import styled from '@emotion/styled';
import { Form, Input, Button } from 'antd';
import { SideNavigation } from 'components/molecule';

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

      <SideNavigation
        paths={[
          {
            href: '/users/1', // TODO: `/users/${userId}`로 수정
            pageName: '사용자 정보',
          },
          {
            href: '/users/1/edit',
            pageName: '프로필 수정',
          },
          {
            href: '/users/1/edit-password',
            pageName: '비밀번호 변경',
          },
        ]}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding-left: 200px;
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
