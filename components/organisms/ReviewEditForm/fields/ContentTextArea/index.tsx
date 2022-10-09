import styled from '@emotion/styled';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { ValueOf } from 'types/utility';
import { SubmitData } from '../..';

const MAX_LENGTH = 1000;
const MESSAGE = {
  NO_ERROR: '',
  REQUIRED_VALUE: '필수 입력값입니다.',
  MAX_LENGTH_EXCEEDED: `${MAX_LENGTH}자 이하로 작성해 주세요.`,
};

interface ContentTextAreaProps {
  prevContent?: string;
  wasSubmitted: boolean;
  onChange: (key: string, value: ValueOf<SubmitData>) => void;
}

const ContentTextArea = ({ prevContent, wasSubmitted, onChange }: ContentTextAreaProps) => {
  const [content, setContent] = useState(prevContent || '');
  const [errorMessage, setErrormessage] = useState(
    prevContent ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE,
  );
  const [touched, setTouched] = useState(false);
  const displayErrorMessage = (wasSubmitted || touched) && !!errorMessage;

  useEffect(() => {
    setContent(prevContent ? prevContent : '');
    setErrormessage(prevContent ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE);
  }, [prevContent]);

  const handleChange = (value: string) => {
    setContent(value);
    onChange('content', value);
    validate(value);
  };

  const validate = (value: string) => {
    if (!value) {
      setErrormessage(MESSAGE.REQUIRED_VALUE);
      return;
    }
    if (value.length > MAX_LENGTH) {
      setErrormessage(MESSAGE.MAX_LENGTH_EXCEEDED);
      return;
    }
    setErrormessage(MESSAGE.NO_ERROR);
  };

  return (
    <>
      <TextArea
        placeholder={`내용을 입력해주세요(${MAX_LENGTH}자 이하)`}
        autoSize
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setTouched(true)}
      />
      <ErrorMessage visible={displayErrorMessage}>{errorMessage}</ErrorMessage>
    </>
  );
};

const TextArea = Input.TextArea;

const ErrorMessage = styled.p<{
  visible: boolean;
}>`
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  margin-top: 2px;
  color: #ff4d4f;
  font-size: 1.4rem;
  height: 16px;
`;

export default ContentTextArea;