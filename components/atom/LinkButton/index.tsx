import { Button } from 'antd';
import Link from 'next/link';
import { ReactNode } from 'react';
interface LinkButtonProps {
  href: string;
  onClick?: () => void;
  children: ReactNode;
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
