import { Avatar } from 'antd';
import styled from '@emotion/styled';
import Link from 'next/link';
import { displayDate } from 'utils';
import { UserProps } from 'types/model';

interface UserInfoProps extends UserProps {
  createdDate: string;
}

const UserInfo = ({ profileImage, nickname, createdDate, userId }: UserInfoProps) => {
  return (
    <UserInfoContainer>
      <Link href={`/user/${userId}`}>
        <a>
          <UserInfoAvatar src={profileImage} size={48} />
        </a>
      </Link>
      <UserInfoTextWrapper>
        <Link href={`/user/${userId}`}>
          <a>
            <UserInfoName>{nickname}</UserInfoName>
          </a>
        </Link>
        <UserInfoDate>{displayDate(createdDate)}</UserInfoDate>
      </UserInfoTextWrapper>
    </UserInfoContainer>
  );
};

const UserInfoAvatar = styled(Avatar)`
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    filter: brightness(70%);
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
`;

const UserInfoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserInfoName = styled.span`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const UserInfoDate = styled.span``;

export default UserInfo;
