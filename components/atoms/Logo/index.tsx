import Link from 'next/link';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface LogoProps {
  href?: string;
  width: number;
  height: number;
  imageStyle?: CSSProperties;
  noTitle?: boolean;
}

const Logo = ({ href = '/', width, height, imageStyle, noTitle }: LogoProps) => {
  return (
    <Link href={href}>
      <a>
        {noTitle ? (
          <Image src="/logo4.svg" alt="logo" width={width} height={height} style={imageStyle} />
        ) : (
          <Image src="/logo3.png" alt="logo" width={width} height={height} style={imageStyle} />
        )}
      </a>
    </Link>
  );
};

export default Logo;
