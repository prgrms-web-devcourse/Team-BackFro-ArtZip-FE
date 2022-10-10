import { UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Avatar } from 'antd';
import Link from 'next/link';

const NotLoginAvatar = ({ size = 48 }) => {
  return (
    <Link href="/signin">
      <StyledAvatar size={size} icon={<UserOutlined />} alt={'not login avatar'} />
    </Link>
  );
};

const StyledAvatar = styled(Avatar)`
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    filter: brightness(70%);
  }
`;

export default NotLoginAvatar;
