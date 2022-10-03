import styled from '@emotion/styled';
import { Button, Form, Input, Image, message } from 'antd';
import { useState, useRef, ChangeEvent } from 'react';
import { SideNavigation } from 'components/molecules';
import { useRecoilState } from 'recoil';
import { userAtom } from 'states';
import {
  convertObjectToFormData,
  convertFilesToFormData,
  validateNickname,
  getBase64,
} from 'utils';
import { userAPI } from 'apis';
import { AxiosError } from 'axios';
import { useDebounce, useCheckAuth } from 'hooks';
import { useForm } from 'antd/lib/form/Form';
import DEFAULT_IMAGE from 'constants/defaultImage';
import { Spinner } from 'components/atoms';
import Head from 'next/head';

interface SubmitData {
  nickname: string | null;
  profileImage: string | null;
}

const ProfileEditPage = () => {
  const [form] = useForm();
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const { userId, nickname, profileImage } = userInfo;

  const submitData = useRef<SubmitData>({
    nickname: nickname,
    profileImage: profileImage,
  });

  const submitFile = useRef<FileList>();
  const [previewImage, setPreviewImage] = useState<string | null>(profileImage);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      submitFile.current = files;
      const preview = await getBase64(files[0]);
      setPreviewImage(preview);
    }
  };

  const handleSubmit = (e?: Event) => {
    e?.preventDefault();
    form.submit();
  };
  const [debounceRef] = useDebounce(handleSubmit, 500, null, 'click');

  const handleFinish = async () => {
    let formData = convertObjectToFormData('data', submitData.current);
    if (submitFile.current) {
      formData = convertFilesToFormData('profileImage', submitFile.current, formData);
    }
    try {
      const { data } = await userAPI.changeMyInfo(formData);
      const { nickname, profileImage } = data.data;
      setUserInfo({
        ...userInfo,
        nickname,
        profileImage,
      });
      message.success('나의 프로필 정보가 수정되었습니다.');
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

  const [isChecking] = useCheckAuth();
  return isChecking ? (
    <Spinner />
  ) : (
    <>
      <Head>
        <title>ArtZip | ProfileEdit</title>
      </Head>
      <>
        <PageContainer>
          <Title>프로필 수정</Title>
          <ProfileEditForm
            layout="vertical"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            form={form}
          >
            <FormItem label="프로필 이미지">
              <ProfileImage
                src={previewImage || DEFAULT_IMAGE.USER_PROFILE}
                alt="profile image"
                onClick={handleImageClick}
                preview={false}
              />
              <FileInput
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                name="profile_img"
                onChange={handleFileChange}
                ref={fileInput}
              />
            </FormItem>
            <FormItem
              name="nickname"
              label="닉네임"
              rules={[{ validator: validateNickname }]}
              initialValue={nickname}
            >
              <Input
                type="text"
                onChange={(e) => {
                  submitData.current.nickname = e.target.value;
                }}
              />
            </FormItem>
            <SubmitButton type="primary" ref={debounceRef}>
              저장
            </SubmitButton>
          </ProfileEditForm>

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
      </>
    </>
  );
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding-left: 200px;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const ProfileEditForm = styled(Form)`
  border: 1px solid ${({ theme }) => theme.color.border.main};
  border-radius: 8px;
  padding: 28px;
  margin-bottom: 40px;

  input[type='file'] {
    display: none;
  }
`;

const FormItem = styled(Form.Item)`
  label {
    font-size: 2rem;
  }

  &:last-of-type {
    height: 100px;
    margin-bottom: 0;
  }
`;

const ProfileImage = styled(Image)`
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const FileInput = styled.input``;

const SubmitButton = styled(Button)`
  font-size: 1.6rem;
  margin-top: 4px;

  span {
    pointer-events: none;
  }
`;

export default ProfileEditPage;
