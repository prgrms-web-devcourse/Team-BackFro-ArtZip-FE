import { Button } from 'antd';
import Link from 'next/link';
import * as React from 'react';

interface LinkButtonProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const LinkButton = ({ href, onClick, children }: LinkButtonProps) => {
  return (
    <Link href={href} onClick={onClick}>
      <a>
        <Button type="text">{children}</Button>
      </a>
    </Link>
  );
};

export default LinkButton;
