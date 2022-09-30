import { Spin } from 'antd';
import { CSSProperties } from 'react';

interface SpinnerProps {
  size?: 'small' | 'default' | 'large';
  height?: string;
  style?: CSSProperties;
}

const Spinner = ({ size = 'large', height = '100vh', style }: SpinnerProps) => {
  const spinStyle = {
    display: 'block',
    height,
    ...style,
  };
  return <Spin size={size} style={spinStyle} />;
};

export default Spinner;
