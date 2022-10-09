import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { ValueOf } from 'types/utility';
import { SubmitData } from '../..';
import ErrorMessage, { MESSAGE_COMMON } from '../../utils/ErrorMessage';

const MAX_LENGTH = 30;
const MESSAGE = {
  ...MESSAGE_COMMON,
  EXCEEDED_MAX_LENGTH: `${MAX_LENGTH}자 이하로 작성해 주세요.`,
};

interface TitleInputProps {
  prevTitle?: string;
  wasSubmitted: boolean;
  onValueChange: (key: string, value: ValueOf<SubmitData>) => void;
  onErrorChange: (key: string, value: string) => void;
}

const TitleInput = ({ prevTitle, wasSubmitted, onValueChange, onErrorChange }: TitleInputProps) => {
  const [title, setTitle] = useState(prevTitle || '');
  const [touched, setTouched] = useState(false);
  const [errorMessage, setErrormessage] = useState(
    prevTitle ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE,
  );
  const displayErrorMessage = (wasSubmitted || touched) && !!errorMessage;

  useEffect(() => {
    setTitle(prevTitle ? prevTitle : '');
    setErrormessage(prevTitle ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE);
  }, [prevTitle]);

  useEffect(() => {
    onValueChange('title', title);
    onErrorChange('title', errorMessage);
  }, [title, errorMessage]);

  const handleChange = (value: string) => {
    setTitle(value);
    validate(value);
  };

  const validate = (value: string) => {
    if (!value) {
      setErrormessage(MESSAGE.REQUIRED_VALUE);
      return;
    }
    if (value.length > MAX_LENGTH) {
      setErrormessage(MESSAGE.EXCEEDED_MAX_LENGTH);
      return;
    }
    setErrormessage(MESSAGE.NO_ERROR);
  };

  return (
    <>
      <Input
        placeholder="제목을 입력해주세요"
        showCount
        maxLength={30}
        value={title}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setTouched(true)}
      />
      <ErrorMessage message={errorMessage} visible={displayErrorMessage} />
    </>
  );
};

export default TitleInput;
