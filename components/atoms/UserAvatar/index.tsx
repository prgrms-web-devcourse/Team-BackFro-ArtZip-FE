import styled from '@emotion/styled';
import { Avatar } from 'antd';
import Link from 'next/link';
import DEFAULT_IMAGE from 'constants/defaultImage';

const UserAvatar = ({ userId, profileImage }: { userId: number; profileImage: string }) => {
  return (
    <Link href={`/users/${userId}`}>
      <a>
        <StyledAvatar src={profileImage || DEFAULT_IMAGE.USER_PROFILE} />
      </a>
    </Link>
  );
};

const StyledAvatar = styled(Avatar)`
  size: 10%;
  cursor: pointer;

  &:hover {
    filter: brightness(70%);
  }
`;

export default UserAvatar;
