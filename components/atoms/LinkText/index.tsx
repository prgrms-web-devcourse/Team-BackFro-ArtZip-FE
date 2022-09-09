import Link from 'next/link';
import styled from '@emotion/styled';
import { CSSProperties, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from '@emotion/react';

interface LinkTextProps {
  href: string;
  text: string;
  highlight?: boolean;
  highlightColor?: string;
  style?: CSSProperties;
}

const LinkText = ({ href, text, highlight = true, highlightColor, style }: LinkTextProps) => {
  const [isCurrentPage, setIsCurrentPage] = useState(false);
  const { pathname } = useRouter();
  const theme = useTheme();

  useEffect(() => {
    if (!highlight) {
      return;
    }
    setIsCurrentPage(href === pathname);
  }, [highlight, href, pathname]);

  return (
    <Link href={href} passHref>
      <StyledA
        isCurrentPage={isCurrentPage}
        highlightColor={highlightColor || theme.color.blue.main}
        style={style}
      >
        {text}
      </StyledA>
    </Link>
  );
};

const StyledA = styled.a<{
  isCurrentPage?: boolean;
  highlightColor: string;
}>`
  display: block;
  font-size: 2.2rem;
  white-space: nowrap;

  ${({ isCurrentPage, highlightColor }) =>
    isCurrentPage &&
    ` 
    color: ${highlightColor};
    font-weight: 500;
  `}
`;

export default LinkText;
