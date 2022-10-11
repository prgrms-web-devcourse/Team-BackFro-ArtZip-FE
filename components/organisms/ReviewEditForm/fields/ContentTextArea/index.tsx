import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { ValueOf } from 'types/utility';
import { SubmitData } from '../..';
import ErrorMessage, { MESSAGE_COMMON } from '../../utils/ErrorMessage';

const MAX_LENGTH = 1000;
const MESSAGE = {
  ...MESSAGE_COMMON,
  MAX_LENGTH_EXCEEDED: `${MAX_LENGTH}자 이하로 작성해 주세요.`,
};

interface ContentTextAreaProps {
  prevContent?: string;
  wasSubmitted: boolean;
  onValueChange: (key: string, value: ValueOf<SubmitData>) => void;
  onErrorChange: (key: string, value: string) => void;
}

const ContentTextArea = ({
  prevContent,
  wasSubmitted,
  onValueChange,
  onErrorChange,
}: ContentTextAreaProps) => {
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

  useEffect(() => {
    onValueChange('content', content);
  }, [content]);

  useEffect(() => {
    onErrorChange('content', errorMessage);
  }, [errorMessage]);

  return (
    <>
      <TextArea
        placeholder={`내용을 입력해주세요(${MAX_LENGTH}자 이하)`}
        autoSize
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setTouched(true)}
      />
      <ErrorMessage message={errorMessage} visible={displayErrorMessage} />
    </>
  );
};

const TextArea = Input.TextArea;

export default ContentTextArea;
