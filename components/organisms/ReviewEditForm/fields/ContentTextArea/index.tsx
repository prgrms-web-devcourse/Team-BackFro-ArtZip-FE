import { Input } from 'antd';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FieldGetter } from '../..';
import ErrorMessage, { ERROR_MESSAGE_COMMON } from '../../utils/ErrorMessage';

const MAX_LENGTH = 1000;
const MESSAGE = {
  ...ERROR_MESSAGE_COMMON,
  MAX_LENGTH_EXCEEDED: `${MAX_LENGTH}자 이하로 작성해 주세요.`,
};

interface ContentTextAreaProps {
  prevContent?: string;
  wasSubmitted: boolean;
}

const ContentTextArea = forwardRef(
  ({ prevContent, wasSubmitted }: ContentTextAreaProps, ref: ForwardedRef<FieldGetter>) => {
    const [content, setContent] = useState(prevContent || '');
    const [error, setError] = useState(prevContent ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE);
    const [touched, setTouched] = useState(false);
    const displayErrorMessage = (wasSubmitted || touched) && !!error;

    useEffect(() => {
      setContent(prevContent ? prevContent : '');
      setError(prevContent ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE);
    }, [prevContent]);

    const handleChange = (value: string) => {
      setContent(value);
      validate(value);
    };

    const validate = (value: string) => {
      if (!value) {
        setError(MESSAGE.REQUIRED_VALUE);
        return;
      }
      if (value.length > MAX_LENGTH) {
        setError(MESSAGE.MAX_LENGTH_EXCEEDED);
        return;
      }
      setError(MESSAGE.NO_ERROR);
    };

    useImperativeHandle(
      ref,
      () => ({
        getFieldValue: () => ({
          content,
        }),
        getFieldError: () => ({
          content: error,
        }),
      }),
      [content, error],
    );

    return (
      <>
        <TextArea
          placeholder={`내용을 입력해주세요(${MAX_LENGTH}자 이하)`}
          autoSize
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={() => setTouched(true)}
        />
        <ErrorMessage message={error} visible={displayErrorMessage} />
      </>
    );
  },
);

const TextArea = Input.TextArea;

ContentTextArea.displayName = 'ContentTextArea';

export default ContentTextArea;
