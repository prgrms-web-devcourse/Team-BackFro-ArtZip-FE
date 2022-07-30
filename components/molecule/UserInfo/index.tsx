import { Avatar } from 'antd';
import styled from '@emotion/styled';
import Link from 'next/link';
import { displayDate } from 'utils';
interface UserInfoProps {
  image: string;
  userName: string;
  createdDate: Date;
  userId: number;
}

const UserInfo = ({ image, userName, createdDate, userId }: UserInfoProps) => {
  return (
    <UserInfoContainer>
      <Link href={`/user/${userId}`}>
        <UserInfoAvatar src={image} size={48} />
      </Link>
      <UserInfoTextWrapper>
        <Link href={`/user/${userId}`}>
          <UserInfoName>{userName}</UserInfoName>
        </Link>
        <UserInfoDate>{displayDate(createdDate)}</UserInfoDate>
      </UserInfoTextWrapper>
    </UserInfoContainer>
  );
};

const UserInfoAvatar = styled(Avatar)`
  &:hover {
    cursor: pointer;
    filter: brightness(70%);
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const UserInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfoName = styled.span`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const UserInfoDate = styled.span``;

export default UserInfo;
