import styled from '@emotion/styled';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'states';

interface SideNavigationProps {
  paths: {
    href: string;
    pageName: string;
  }[];
}

const SideNavigation = ({ paths }: SideNavigationProps) => {
  const { userId } = useRecoilValue(userAtom);
  const { query, asPath } = useRouter();

  const isMyPage = String(userId) === query.id;

  return isMyPage ? (
    <Navigation>
      {paths.map(({ href, pageName }, i) => (
        <Link href={href} key={i}>
          <a>
            <NavigationButton type={asPath === href ? 'primary' : 'default'} size="large">
              {pageName}
            </NavigationButton>
          </a>
        </Link>
      ))}
    </Navigation>
  ) : null;
};

const Navigation = styled.nav`
  position: absolute;
  top: 20px;
  left: 0;
`;

const NavigationButton = styled(Button)`
  display: block;
  width: 130px;
  margin-bottom: 2px;
`;

export default SideNavigation;
