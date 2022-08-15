import Link from 'next/link';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface LogoProps {
  href?: string;
  width: number;
  height: number;
  imageStyle?: CSSProperties;
}

const Logo = ({ href = '/', width, height, imageStyle }: LogoProps) => {
  return (
    <Link href={href}>
      <a>
        <Image src="/logo.svg" alt="logo" width={width} height={height} style={imageStyle} />
      </a>
    </Link>
  );
};

export default Logo;
