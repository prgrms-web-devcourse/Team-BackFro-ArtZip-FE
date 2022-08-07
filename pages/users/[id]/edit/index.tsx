import styled from '@emotion/styled';
import Link from 'next/link';
import { Button, Form, Input, Image } from 'antd';
import { useState, useRef, ChangeEvent } from 'react';

const UserEditPage = () => {
  const [image, setImage] = useState<string>(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [file, setFile] = useState<FileList>();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log(files);
  };

  return (
    <PageContainer>
      <Title>프로필 수정</Title>
      <ProfileEditForm layout="vertical">
        <FormItem label="프로필 이미지">
          <ProfileImage
            src={image}
            alt="profile image"
            onClick={handleImageClick}
            preview={false}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg, image/png, image/jpeg"
            name="profile_img"
            onChange={handleChange}
            ref={fileInput}
          />
        </FormItem>
        <FormItem label="닉네임" style={{ fontSize: '1.8rem' }}>
          <Input type="text" defaultValue="미스터공공" />
        </FormItem>
        <SubmitButton type="primary">저장</SubmitButton>
      </ProfileEditForm>

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
            <NavigationButton type="primary" size="large">
              프로필 수정
            </NavigationButton>
          </a>
        </Link>
        <Link href="/users/1/edit-password">
          <a>
            <NavigationButton type="default" size="large">
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

const Title = styled.h1`
  margin-bottom: 10px;
`;

const SubmitButton = styled(Button)`
  font-size: 1.6rem;
`;

export default UserEditPage;
