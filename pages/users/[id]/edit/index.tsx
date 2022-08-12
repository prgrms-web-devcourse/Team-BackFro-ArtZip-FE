import styled from '@emotion/styled';
import { Button, Form, Input, Image, message } from 'antd';
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { SideNavigation } from 'components/molecule';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';
import { useRouter } from 'next/router';
import { objectToFormData, filesToFormData } from 'utils';
import { userAPI } from 'apis';

interface SubmitData {
  nickname: string;
  profileImage: string;
}

const UserEditPage = () => {
  const route = useRouter();
  const { nickname, profileImage } = route.query;
  const submitData = useRef<SubmitData>({
    nickname: nickname as string,
    profileImage: profileImage as string,
  });
  const submitImageFile = useRef<FileList>();
  const [previewImage, setPreviewImage] = useState(profileImage);
  const fileInput = useRef<HTMLInputElement>(null);
  const { userId } = useRecoilValue(userAtom);

  const handleImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      submitImageFile.current = files;

      const fileReader = new FileReader();
      fileReader.onload = () => {
        fileReader.result && setPreviewImage(fileReader.result as string);
      };
      fileReader.readAsDataURL(files[0]);
    }
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    submitData.current.nickname = e.target.value;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let formData = objectToFormData('data', submitData.current);
    if (submitImageFile.current) {
      formData = filesToFormData('profileImage', submitImageFile.current, formData);
    }

    try {
      await userAPI.changeMyInfo(formData);
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
            src={previewImage as string}
            alt="profile image"
            onClick={handleImageClick}
            preview={false}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg, image/png, image/jpeg"
            name="profile_img"
            onChange={handleImageChange}
            ref={fileInput}
          />
        </FormItem>
        <FormItem label="닉네임">
          <Input type="text" defaultValue={nickname} onChange={handleNicknameChange} />
        </FormItem>
        <SubmitButton type="primary" htmlType="submit" onClick={handleSubmit}>
          저장
        </SubmitButton>
      </ProfileEditForm>

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

const Title = styled.h1`
  margin-bottom: 10px;
`;

const ProfileEditForm = styled(Form)`
  border: 1px solid ${({ theme }) => theme.color.border.main};
  border-radius: 8px;
  padding: 28px;
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

const SubmitButton = styled(Button)`
  font-size: 1.6rem;
`;

export default UserEditPage;
