import styled from '@emotion/styled';
import { Avatar } from 'antd';
import Link from 'next/link';

const UserAvatar = ({ userId, profileImage }: { userId: number; profileImage: string }) => {
  return (
    <Link href={`/user/${userId}`}>
      <a>
        <StyledAvatar src={profileImage} size={48} />
      </a>
    </Link>
  );
};

const StyledAvatar = styled(Avatar)`
  &:hover {
    cursor: pointer;
    filter: brightness(70%);
  }
`;

export default UserAvatar;
