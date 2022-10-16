import { Input } from 'antd';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ErrorMessage, { ERROR_MESSAGE_COMMON } from '../../utils/ErrorMessage';
import { FieldGetter } from '../..';

const MAX_LENGTH = 30;
const MESSAGE = {
  ...ERROR_MESSAGE_COMMON,
  EXCEEDED_MAX_LENGTH: `${MAX_LENGTH}자 이하로 작성해 주세요.`,
};

interface TitleInputProps {
  prevTitle?: string;
  wasSubmitted: boolean;
}

const TitleInput = forwardRef(
  ({ prevTitle, wasSubmitted }: TitleInputProps, ref: ForwardedRef<FieldGetter>) => {
    const [title, setTitle] = useState(prevTitle || '');
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState(prevTitle ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE);
    const displayErrorMessage = (wasSubmitted || touched) && !!error;

    useEffect(() => {
      setTitle(prevTitle ? prevTitle : '');
      setError(prevTitle ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE);
    }, [prevTitle]);

    const handleChange = (value: string) => {
      setTitle(value);
      validate(value);
    };

    const validate = (value: string) => {
      if (!value) {
        setError(MESSAGE.REQUIRED_VALUE);
        return;
      }
      if (value.length > MAX_LENGTH) {
        setError(MESSAGE.EXCEEDED_MAX_LENGTH);
        return;
      }
      setError(MESSAGE.NO_ERROR);
    };

    useImperativeHandle(
      ref,
      () => ({
        getFieldValue: () => ({
          title,
        }),
        getFieldError: () => ({
          title: error,
        }),
      }),
      [title, error],
    );

    return (
      <>
        <Input
          placeholder="제목을 입력해주세요"
          showCount
          value={title}
          maxLength={30}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        <ErrorMessage message={error} visible={displayErrorMessage} />
      </>
    );
  },
);

TitleInput.displayName = 'TitleInput';

export default TitleInput;
