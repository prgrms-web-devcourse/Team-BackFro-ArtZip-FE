import styled from '@emotion/styled';
import { Button, Form, Input, Image, message } from 'antd';
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { SideNavigation } from 'components/molecules';
import { useRecoilState } from 'recoil';
import { userAtom } from 'states';
import { objectToFormData, filesToFormData } from 'utils';
import { userAPI } from 'apis';

interface SubmitData {
  nickname: string;
  profileImage: string;
}

const UserEditPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const { userId, nickname, profileImage } = userInfo;

  const submitData = useRef<SubmitData>({
    nickname: nickname,
    profileImage: profileImage,
  });
  const submitFile = useRef<FileList>();
  const [previewImage, setPreviewImage] = useState(profileImage);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      submitFile.current = files;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        fileReader.result && setPreviewImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let formData = objectToFormData('data', submitData.current);
    if (submitFile.current) {
      formData = filesToFormData('profileImage', submitFile.current, formData);
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
      console.error('프로필 정보 실패'); // TODO: 에러 처리 보완
    }
  };

  return (
    <PageContainer>
      <Title>프로필 수정</Title>
      <ProfileEditForm layout="vertical">
        <FormItem label="프로필 이미지">
          <ProfileImage
            src={previewImage}
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
        <FormItem label="닉네임">
          <Input
            type="text"
            defaultValue={nickname}
            onChange={(e) => {
              submitData.current.nickname = e.target.value;
            }}
          />
        </FormItem>
        <SubmitButton type="primary" htmlType="submit" onClick={handleSubmit}>
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
  );
};

const PageContainer = styled.div`
  position: relative;
  max-width: 1100px;
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

  input[type='file'] {
    display: none;
  }
`;

const FormItem = styled(Form.Item)`
  label {
    font-size: 2rem;
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
`;

export default UserEditPage;
