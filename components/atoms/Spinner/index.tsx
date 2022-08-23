import { Spin } from 'antd';
import { CSSProperties } from 'react';

interface SpinnerProps {
  size?: 'small' | 'default' | 'large';
  style?: CSSProperties;
}

const Spinner = ({ size = 'large', style }: SpinnerProps) => {
  const spinStyle = {
    display: 'block',
    ...style,
  };
  return <Spin size={size} style={spinStyle} />;
};

export default Spinner;
