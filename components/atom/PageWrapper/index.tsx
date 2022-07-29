import { ReactElement } from 'react';
import { css } from '@emotion/react';
import { breakPoint } from 'constants/styles/breakPoint';

interface PageWrapperProps {
  children: ReactElement;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return <div css={dynamicWidth}>{children}</div>;
};

const dynamicWidth = css`
  width: 80%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${breakPoint.mobile}) {
    width: 90%;
  }
`;

export default PageWrapper;
