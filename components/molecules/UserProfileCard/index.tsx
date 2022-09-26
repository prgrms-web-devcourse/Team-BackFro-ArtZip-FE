import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { Image } from 'antd';
import DEFAULT_IMAGE from 'constants/defaultImage';

interface UserProfileCardProps {
  data: {
    email: string;
    nickname: string;
    profileImage: string;
  };
  cardStyle?: CSSProperties;
  photoStyle?: CSSProperties;
}

const UserProfileCard = ({ data, cardStyle, photoStyle }: UserProfileCardProps) => {
  const { email, nickname, profileImage } = data;
  return (
    <ProfileContainer style={cardStyle}>
      <ProfileImage
        src={profileImage || DEFAULT_IMAGE.USER_PROFILE}
        alt="프로필 이미지"
        style={photoStyle}
      />
      <UserNickname>{nickname}</UserNickname>
      <UserEmail>{email}</UserEmail>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 20px;
  background-color: transparent;
`;

const ProfileImage = styled(Image)`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const UserNickname = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
`;

const UserEmail = styled.span`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.color.font.dark};
`;

export default UserProfileCard;
