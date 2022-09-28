import styled from '@emotion/styled';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SideNavigationProps {
  paths: {
    href: string;
    pageName: string;
  }[];
}

const SideNavigation = ({ paths }: SideNavigationProps) => {
  const { asPath } = useRouter();

  return (
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
  );
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
