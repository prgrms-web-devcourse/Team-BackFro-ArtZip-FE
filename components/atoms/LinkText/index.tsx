import Link from 'next/link';
import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface LinkTextProps {
  href: string;
  text: string;
  textStyle?: CSSProperties;
  isCurrentPage?: boolean;
}

const LinkText = ({ href, text, textStyle, isCurrentPage }: LinkTextProps) => {
  return (
    <Link href={href} passHref>
      <StyledA style={textStyle} isCurrentPage={isCurrentPage}>
        {text}
      </StyledA>
    </Link>
  );
};

const StyledA = styled.a<{
  isCurrentPage?: boolean;
}>`
  font-size: 2.6rem;
  white-space: nowrap;

  ${({ isCurrentPage }) =>
    isCurrentPage &&
    ` 
    color: #242f9b;
    font-weight: 500;
    border-bottom: 4px solid #242f9b;
  `}
`;

export default LinkText;
