import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { ValueOf } from 'types/utility';
import { SubmitData } from '../..';

interface TitleInputProps {
  prevTitle?: string;
  handleChange: (key: string, value: ValueOf<SubmitData>) => void;
}

const TitleInput = ({ prevTitle, handleChange }: TitleInputProps) => {
  const [title, setTitle] = useState(prevTitle || '');

  useEffect(() => {
    prevTitle && setTitle(prevTitle);
  }, [prevTitle]);

  return (
    <Input
      placeholder="제목을 입력해주세요"
      showCount
      maxLength={30}
      value={title}
      onChange={(e) => {
        handleChange('title', e.target.value);
        setTitle(e.target.value);
      }}
    />
  );
};

export default TitleInput;
