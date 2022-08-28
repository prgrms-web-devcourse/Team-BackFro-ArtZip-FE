import { UpCircleFilled, DownCircleFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { keyframes } from '@emotion/react';

const ScrollButton = ({ type }: { type: 'up' | 'down' }) => {
  const [scrollY, setScrollY] = useState(0);
  const scrollToPosition = type === 'up' ? 0 : document.documentElement.scrollHeight;

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
  };

  const handleScroll = () => {
    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth',
    });
    setScrollY(scrollToPosition);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleFollow);
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return (
    <ScrollButtonUp onClick={handleScroll}>
      {type === 'up' ? <UpCircleFilled /> : <DownCircleFilled />}
    </ScrollButtonUp>
  );
};

const ripple = keyframes`
 0% {
    transform: scale(1);
    opacity: 0.75;
  }
  50%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

const ScrollButtonUp = styled.button`
  position: relative;
  font-size: 100px;
  font-weight: 900;
  height: fit-content;
  border: none;
  opacity: 0.5;
  color: ${({ theme }) => theme.color.blue.light};
  &:hover {
    color: ${({ theme }) => theme.color.blue.dark};
    opacity: 1;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 1%;
    top: 23%;
    width: 100px;
    height: 100px;
    border: ${({ theme }) => theme.color.blue.light} 12px solid;
    opacity: 0.3;
    animation: ${ripple} 3s ease-out infinite;
    border-radius: 50%;
    z-index: -1;
  }

  &:after {
    animation-delay: -0.6s;
  }
`;
export default ScrollButton;
