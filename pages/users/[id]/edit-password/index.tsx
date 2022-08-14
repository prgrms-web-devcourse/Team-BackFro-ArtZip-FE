import styled from '@emotion/styled';
import { Form, Input, Button } from 'antd';
import { SideNavigation } from 'components/molecule';
import { useRouter } from 'next/router';
import { FormEvent, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { UserChangePasswordRequest } from 'types/apis/user';
import { ValueOf } from 'types/utility';

const UserEditPasswordPage = () => {
  const { userId } = useRecoilValue(userAtom);

  return (
    <PageContainer>
      <Title>비밀번호 변경</Title>
      <PasswordEditForm layout="vertical">
        <FormItem label="현재 비밀번호" name="oldPassword">
          <Input type="password" />
        </FormItem>
        <FormItem label="비밀번호" name="newPassword">
          <Input type="password" />
        </FormItem>
        <FormItem label="비밀번호 확인" name="passwordCheck">
          <Input type="password" />
        </FormItem>
        <SubmitButton type="primary" htmlType="submit">
          변경
        </SubmitButton>
      </PasswordEditForm>

      <SideNavigation
        paths={[
          {
            pathName: `/users/${userId}`,
            pageName: '사용자 정보',
          },
          {
            pathName: `/users/${userId}/edit`,
            pageName: '프로필 수정',
          },
          {
            pathName: `/users/${userId}/edit-password`,
            pageName: '비밀번호 변경',
          },
        ]}
      />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1100px;
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
