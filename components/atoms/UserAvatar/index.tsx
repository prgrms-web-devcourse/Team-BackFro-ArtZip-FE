import styled from '@emotion/styled';
import { Avatar } from 'antd';
import Link from 'next/link';

const UserAvatar = ({ userId, profileImage }: { userId: number; profileImage: string }) => {
  return (
    <Link href={`/users/${userId}`}>
      <a>
        <StyledAvatar src={profileImage} />
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
