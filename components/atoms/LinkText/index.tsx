import Link from 'next/link';
import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface LinkTextProps {
  href: string;
  text: string;
  textStyle?: CSSProperties;
}

const LinkText = ({ href, text, textStyle }: LinkTextProps) => {
  return (
    <Link href={href} passHref>
      <StyledA style={textStyle}>{text}</StyledA>
    </Link>
  );
};

const StyledA = styled.a`
  font-size: 2.6rem;
`;

export default LinkText;
