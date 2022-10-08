import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { ValueOf } from 'types/utility';
import { SubmitData } from '../..';

interface ContentTextAreaProps {
  prevContent?: string;
  handleChange: (key: string, value: ValueOf<SubmitData>) => void;
}

const ContentTextArea = ({ prevContent, handleChange }: ContentTextAreaProps) => {
  const [content, setContent] = useState(prevContent || '');

  useEffect(() => {
    prevContent && setContent(prevContent);
  }, [prevContent]);

  return (
    <TextArea
      placeholder="내용을 입력해주세요(1000자 이하)"
      autoSize
      value={content}
      onChange={(e) => {
        handleChange('content', e.target.value);
        setContent(e.target.value);
      }}
    />
  );
};

const TextArea = Input.TextArea;

export default ContentTextArea;
