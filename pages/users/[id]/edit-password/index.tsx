import styled from '@emotion/styled';
import { Form, Input, Button, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { SideNavigation } from 'components/molecules';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { userAPI } from 'apis';
import { AxiosError } from 'axios';
import { validatePassword } from 'utils';

const UserEditPasswordPage = () => {
  const { userId } = useRecoilValue(userAtom);
  const [form] = useForm();

  const validatePasswordCheck = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject(new Error('필수 입력값 입니다.'));
    }
    if (value !== form.getFieldValue('newPassword')) {
      return Promise.reject(new Error('비밀번호와 일치하지 않습니다.'));
    }
    return Promise.resolve();
  };

  const handleFinish = async () => {
    const { oldPassword, newPassword } = form.getFieldsValue();
    try {
      await userAPI.changePassword({
        oldPassword,
        newPassword,
      });
      message.success('비밀번호가 변경되었습니다.');
    } catch (error) {
      let errorMessage;
      if (error instanceof AxiosError) {
        errorMessage = error.response?.data.message;
      } else {
        errorMessage = String(error);
      }
      message.error(errorMessage);
      console.error(error);
    }
  };

  const handleFinishFailed = () => {
    message.error('입력값을 다시 확인해주세요.');
  };

  return (
    <PageContainer>
      <Title>비밀번호 변경</Title>
      <PasswordEditForm
        form={form}
        layout="vertical"
        initialValues={{
          oldPassword: '',
          newPassword: '',
        }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      >
        <FormItem
          label="현재 비밀번호"
          name="oldPassword"
          rules={[
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input type="password" />
        </FormItem>
        <FormItem
          label="비밀번호"
          name="newPassword"
          rules={[
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input type="password" />
        </FormItem>
        <FormItem
          label="비밀번호 확인"
          name="passWordCheck"
          rules={[{ validator: validatePasswordCheck }]}
        >
          <Input type="password" />
        </FormItem>
        <SubmitButton type="primary" htmlType="submit">
          변경
        </SubmitButton>
      </PasswordEditForm>

      <SideNavigation
        paths={[
          {
            href: `/users/${userId}`,
            pageName: '사용자 정보',
          },
          {
            href: `/users/${userId}/edit`,
            pageName: '프로필 수정',
          },
          {
            href: `/users/${userId}/edit-password`,
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
  margin-bottom: 40px;
`;

const FormItem = styled(Form.Item)`
  height: 100px;
  margin-bottom: 0;

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
