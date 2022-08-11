import styled from '@emotion/styled';
import { Avatar } from 'antd';
import Link from 'next/link';

const UserAvatar = ({ userId, profileImage }: { userId: number; profileImage: string }) => {
  return (
    <Link href={`/user/${userId}`}>
      <a>
        <StyledAvatar src={profileImage} />
      </a>
    </Link>
  );
};

const StyledAvatar = styled(Avatar)`
  size: 10%;
  &:hover {
    cursor: pointer;
    filter: brightness(70%);
  }
`;

export default UserAvatar;
